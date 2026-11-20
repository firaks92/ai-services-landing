import { bot, isBotTokenConfigured } from '../bot/bot.js';
import { env } from '../config/env.js';
import { formatLeadMessage } from '../bot/formatter.js';
import { createLeadKeyboard } from '../bot/keyboards.js';
import { leadService } from './lead.service.js';
import type { Lead } from '@prisma/client';

const RETRY_DELAYS_MS = [2000, 5000, 15000];

export class NotifierService {
  /**
   * Dispatches formatted lead to Telegram with retry mechanism
   */
  public async dispatchLead(lead: Lead): Promise<boolean> {
    const htmlMessage = formatLeadMessage(lead);
    const keyboard = createLeadKeyboard(lead);

    if (!isBotTokenConfigured) {
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📢 [DEV MOCK NOTIFIER] Telegram bot token not configured or default.');
      console.log(`Telegram destination: Chat ${env.TELEGRAM_ADMIN_CHAT_ID}`);
      console.log('Message Body:\n', htmlMessage.replace(/<[^>]+>/g, ''));
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

      await leadService.updateTelegramDelivery(lead.leadCode, env.TELEGRAM_ADMIN_CHAT_ID, 999999, 'SENT');
      return true;
    }

    const chatId = env.TELEGRAM_ADMIN_CHAT_ID;
    const topicId = env.TELEGRAM_TOPIC_ID ? Number(env.TELEGRAM_TOPIC_ID) : undefined;

    // Send asynchronously with retry policy to respect SLA < 3s for API response
    this.sendWithRetry(lead, htmlMessage, keyboard, chatId, topicId, 0);
    return true;
  }

  private async sendWithRetry(
    lead: Lead,
    html: string,
    keyboard: ReturnType<typeof createLeadKeyboard>,
    chatId: string,
    topicId: number | undefined,
    attempt: number
  ) {
    try {
      const message = await bot.api.sendMessage(chatId, html, {
        parse_mode: 'HTML',
        reply_markup: keyboard,
        message_thread_id: topicId,
        link_preview_options: { is_disabled: true },
      });

      await leadService.updateTelegramDelivery(lead.leadCode, chatId, message.message_id, 'SENT');
      console.log(`✅ [Telegram Notifier] Delivered lead #${lead.leadCode} to chat ${chatId}`);
    } catch (err: any) {
      console.error(`⚠️ [Telegram Notifier] Attempt ${attempt + 1} failed for #${lead.leadCode}:`, err?.message || err);

      if (attempt < RETRY_DELAYS_MS.length) {
        const delay = RETRY_DELAYS_MS[attempt];
        console.log(`⏳ [Telegram Notifier] Retrying lead #${lead.leadCode} in ${delay}ms...`);
        setTimeout(() => {
          this.sendWithRetry(lead, html, keyboard, chatId, topicId, attempt + 1);
        }, delay);
      } else {
        console.error(`❌ [Telegram Notifier] All ${RETRY_DELAYS_MS.length} retry attempts exhausted for #${lead.leadCode}`);
        await leadService.updateTelegramDelivery(lead.leadCode, chatId, 0, 'FAILED');
      }
    }
  }
}

export const notifierService = new NotifierService();
