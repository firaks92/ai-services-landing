import type { Context } from 'grammy';
import { env } from '../../config/env.js';
import { leadService } from '../../services/lead.service.js';
import { escapeHtml } from '../../utils/escapeHtml.js';
import { InlineKeyboard } from 'grammy';

export async function handleStartCommand(ctx: Context) {
  const text = ctx.message?.text || '';
  const match = text.match(/^\/start\s+lead_(AI-\d+-\d+)$/i);

  if (match) {
    const leadCode = match[1];
    const lead = await leadService.getLeadByCode(leadCode);

    if (lead) {
      // Save clientTelegramId in DB
      const clientId = String(ctx.from?.id);
      await leadService.updateClientTelegramId(leadCode, clientId);

      // Send personalized welcome to client
      const greeting = `Здравствуйте, <b>${escapeHtml(lead.residentName)}</b>!\n\nМы уже получили вашу заявку <code>#${escapeHtml(lead.leadCode)}</code> по направлению <b>«${escapeHtml(lead.primaryService)}»</b>.\n\nИнженер ознакомится с параметрами и свяжется с вами в течение 15 минут.\nЕсли хотите прислать файлы, ТЗ или дополнить задачу — просто напишите ответным сообщением прямо сюда.`;

      await ctx.reply(greeting, { parse_mode: 'HTML' });

      // Notify admin chat with a reply to the original lead card if available
      if (env.TELEGRAM_ADMIN_CHAT_ID) {
        const clientUsername = ctx.from?.username ? `@${ctx.from.username}` : 'без @username';
        const adminNotification = `🔔 <b>Клиент зашел в бот</b>\n• Заявка: <code>#${escapeHtml(lead.leadCode)}</code>\n• Житель: ${escapeHtml(lead.residentName)}\n• Telegram ID: <code>${clientId}</code> (${clientUsername})`;

        try {
          const replyOptions: Record<string, any> = { parse_mode: 'HTML' };
          if (lead.telegramMessageId) {
            replyOptions.reply_parameters = { message_id: lead.telegramMessageId };
          }
          await ctx.api.sendMessage(env.TELEGRAM_ADMIN_CHAT_ID, adminNotification, replyOptions);
        } catch (err) {
          console.error('Failed to notify admin about client start:', err);
        }
      }
      return;
    }
  }

  // Fallback for general /start
  const siteUrl = env.FRONTEND_ORIGIN || 'http://localhost:5173';
  const welcomeText = `👋 <b>Добро пожаловать в инженерное бюро AI.STUDIO!</b>\n\nМы проектируем и внедряем ИИ-решения для бизнеса: чат-боты, голосовые роботы, интеграции с CRM и автоматизацию процессов.\n\nПройдите быстрый 1-минутный опрос на сайте, чтобы подобрать оптимальное решение под вашу задачу и получить предварительный расчет:`;

  const keyboard = new InlineKeyboard().url('🚀 Подобрать ИИ-услугу (1 мин)', siteUrl);

  await ctx.reply(welcomeText, {
    parse_mode: 'HTML',
    reply_markup: keyboard,
  });
}
