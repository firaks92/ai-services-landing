import type { FastifyPluginAsync } from 'fastify';
import { UAParser } from 'ua-parser-js';
import { leadSubmissionSchema } from '../schemas/lead.schema.js';
import { leadService } from '../../services/lead.service.js';
import { geoService } from '../../services/geo.service.js';
import { turnstileService } from '../../services/turnstile.service.js';
import { notifierService } from '../../services/notifier.service.js';
import { getClientIp } from '../../utils/ip.js';
import { env } from '../../config/env.js';

export const leadsRoute: FastifyPluginAsync = async (fastify) => {
  fastify.post(
    '/leads',
    {
      config: {
        rateLimit: {
          max: 3,
          timeWindow: '10 minutes',
        },
      },
    },
    async (request, reply) => {
      const parseResult = leadSubmissionSchema.safeParse(request.body);

      if (!parseResult.success) {
        const errors = parseResult.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));
        return reply.status(400).send({
          success: false,
          message: 'Ошибка валидации данных',
          errors,
        });
      }

      const body = parseResult.data;

      // 1. Honeypot check
      if (body.security?.honeypot && body.security.honeypot.trim().length > 0) {
        // Return fake success for bots
        const fakeCode = leadService.generateLeadCode();
        return reply.status(201).send({
          success: true,
          lead_id: fakeCode,
          bot_deep_link: `https://t.me/${env.TELEGRAM_BOT_USERNAME}?start=lead_${fakeCode}`,
        });
      }

      const clientIp = getClientIp(request);

      // 2. Cloudflare Turnstile token validation if enabled
      if (env.TURNSTILE_ENABLED) {
        const isHuman = await turnstileService.verifyToken(body.security?.turnstile_token || undefined, clientIp);
        if (!isHuman) {
          return reply.status(403).send({
            success: false,
            message: 'Проверка безопасности (Turnstile) не пройдена',
          });
        }
      }

      // 3. Extract technical metadata (Geo-IP & UA)
      const geo = await geoService.lookup(clientIp);

      const userAgentHeader = request.headers['user-agent'] || '';
      const uaParser = new UAParser(userAgentHeader);
      const uaResult = uaParser.getResult();
      const deviceType = uaResult.device.type ? `${uaResult.device.type} (${uaResult.os.name || 'OS'} / ${uaResult.browser.name || 'Browser'})` : `Desktop (${uaResult.os.name || 'OS'} / ${uaResult.browser.name || 'Browser'})`;

      // 4. Save to Database
      const lead = await leadService.createLead({
        quizSource: body.quiz_source,
        serviceFocus: {
          serviceCode: body.service_focus.service_code,
          primaryService: body.service_focus.primary_service,
          serviceDetails: body.service_focus.service_details,
          industry: body.service_focus.industry,
          timeline: body.service_focus.timeline,
          budget: body.service_focus.budget,
        },
        residentInfo: {
          name: body.resident_info.name,
          cityInput: body.resident_info.city_input,
          preferredChannel: body.resident_info.preferred_channel,
          phone: body.resident_info.phone,
          telegramUsername: body.resident_info.telegram_username,
          comment: body.resident_info.comment,
        },
        clientMeta: {
          language: body.client_meta.language || request.headers['accept-language']?.split(',')[0],
          pageUrl: body.client_meta.pageUrl || body.client_meta.page_url,
          referrer: body.client_meta.referrer,
          utm: body.client_meta.utm || undefined,
        },
        geo: {
          ip: clientIp,
          country: geo.country,
          region: geo.region,
          city: geo.city,
          timezone: geo.timezone,
        },
        deviceInfo: deviceType,
      });

      // 5. Send notification to Telegram bot
      await notifierService.dispatchLead(lead);

      const botDeepLink = `https://t.me/${env.TELEGRAM_BOT_USERNAME}?start=lead_${lead.leadCode}`;

      return reply.status(201).send({
        success: true,
        lead_id: lead.leadCode,
        bot_deep_link: botDeepLink,
      });
    }
  );
};
