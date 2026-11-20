import { InlineKeyboard } from 'grammy';
import type { Lead } from '@prisma/client';

export function createLeadKeyboard(lead: Lead): InlineKeyboard {
  const keyboard = new InlineKeyboard();

  // Row 1: Direct link to client's Telegram if provided
  if (lead.telegramUsername) {
    const cleanUsername = lead.telegramUsername.replace(/^@/, '');
    keyboard.url('💬 Написать в Telegram', `https://t.me/${cleanUsername}`).row();
  }

  // Row 2: Status action buttons
  if (lead.status === 'NEW') {
    keyboard
      .text('✅ Взять в работу', `lead:take:${lead.leadCode}`)
      .text('🚫 Спам', `lead:spam:${lead.leadCode}`);
  } else if (lead.status === 'IN_PROGRESS') {
    keyboard
      .text('🏁 Завершить', `lead:done:${lead.leadCode}`)
      .text('↩️ Вернуть в новые', `lead:reset:${lead.leadCode}`);
  } else if (lead.status === 'COMPLETED') {
    keyboard.text('↩️ Вернуть в работу', `lead:take:${lead.leadCode}`);
  } else if (lead.status === 'SPAM') {
    keyboard.text('↩️ Восстановить (в новые)', `lead:reset:${lead.leadCode}`);
  }

  return keyboard;
}
