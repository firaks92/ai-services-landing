import type { Context } from 'grammy';
import { leadService } from '../../services/lead.service.js';
import { formatLeadMessage } from '../formatter.js';
import { createLeadKeyboard } from '../keyboards.js';

export async function handleLeadCallback(ctx: Context) {
  const data = ctx.callbackQuery?.data;
  if (!data || !data.startsWith('lead:')) return;

  const parts = data.split(':');
  const action = parts[1];
  const leadCode = parts[2];

  if (!action || !leadCode) return;

  const lead = await leadService.getLeadByCode(leadCode);
  if (!lead) {
    await ctx.answerCallbackQuery({ text: '⚠️ Заявка не найдена в базе данных', show_alert: true });
    return;
  }

  const managerName = ctx.from?.username
    ? `@${ctx.from.username}`
    : ctx.from?.first_name || 'Менеджер';

  let newStatus: 'NEW' | 'IN_PROGRESS' | 'COMPLETED' | 'SPAM' = 'NEW';
  let alertText = '';

  switch (action) {
    case 'take':
      newStatus = 'IN_PROGRESS';
      alertText = `Заявка #${leadCode} взята в работу!`;
      break;
    case 'done':
      newStatus = 'COMPLETED';
      alertText = `Заявка #${leadCode} завершена!`;
      break;
    case 'spam':
      newStatus = 'SPAM';
      alertText = `Заявка #${leadCode} помечена как спам.`;
      break;
    case 'reset':
      newStatus = 'NEW';
      alertText = `Заявка #${leadCode} возвращена в статус "Новая".`;
      break;
    default:
      await ctx.answerCallbackQuery({ text: 'Неизвестное действие' });
      return;
  }

  const updatedLead = await leadService.updateStatus(
    leadCode,
    newStatus,
    newStatus === 'NEW' ? undefined : managerName
  );

  const newHtml = formatLeadMessage(updatedLead);
  const newKeyboard = createLeadKeyboard(updatedLead);

  try {
    await ctx.editMessageText(newHtml, {
      parse_mode: 'HTML',
      reply_markup: newKeyboard,
      link_preview_options: { is_disabled: true },
    });
  } catch (err) {
    console.error('Failed to edit telegram message on callback:', err);
  }

  await ctx.answerCallbackQuery({ text: alertText });
}
