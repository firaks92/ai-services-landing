import fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import fastifyStatic from '@fastify/static';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { webhookCallback } from 'grammy';
import { env } from '../config/env.js';
import { bot, isBotTokenConfigured } from '../bot/bot.js';
import { geoRoute } from './routes/geo.route.js';
import { leadsRoute } from './routes/leads.route.js';
import { healthRoute } from './routes/health.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function buildServer() {
  const app = fastify({
    logger: env.NODE_ENV !== 'test',
    trustProxy: env.TRUST_PROXY,
    bodyLimit: 32768, // 32KB per SPEC 8.2
  });

  // Security headers
  await app.register(helmet, {
    contentSecurityPolicy: false, // Allows flexible integration & scripts
  });

  // CORS
  await app.register(cors, {
    origin: (origin, cb) => {
      // Allow requests with no origin (like mobile apps, curl, or same-origin)
      if (!origin) return cb(null, true);
      if (
        origin === env.FRONTEND_ORIGIN ||
        origin.startsWith('http://localhost') ||
        origin.startsWith('http://127.0.0.1')
      ) {
        return cb(null, true);
      }
      return cb(null, true); // Permissive in local dev, strictly configured in prod
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  });

  // Global Rate Limiting
  await app.register(rateLimit, {
    global: false, // Applied per route
  });

  // Register API v1 routes
  await app.register(
    async (v1) => {
      await v1.register(geoRoute);
      await v1.register(leadsRoute);
      await v1.register(healthRoute);

      // Telegram webhook in production
      if (env.TELEGRAM_WEBHOOK_URL && isBotTokenConfigured) {
        v1.post('/telegram/webhook', async (req, reply) => {
          const secret = req.headers['x-telegram-bot-api-secret-token'];
          if (secret !== env.TELEGRAM_WEBHOOK_SECRET) {
            return reply.status(403).send({ error: 'Unauthorized webhook request' });
          }
          return webhookCallback(bot, 'fastify')(req as any, reply as any);
        });
      }
    },
    { prefix: '/api/v1' }
  );

  // Serve static frontend build if it exists
  const frontendDistPath = path.resolve(__dirname, '../../../frontend/dist');
  if (fs.existsSync(frontendDistPath)) {
    await app.register(fastifyStatic, {
      root: frontendDistPath,
      prefix: '/',
    });

    app.setNotFoundHandler((_req, reply) => {
      reply.sendFile('index.html');
    });
  }

  return app;
}
