import type { LeadSubmissionPayload, LeadSubmissionResponse } from '../types/quiz.js';

const TELEGRAM_BOT_TOKEN = '9084035616:AAG3UVqWsKnCDzK1mAQFvIGF0eiUQnJ2_u0';
const TELEGRAM_ADMIN_CHAT_ID = '-5494937418';
const TELEGRAM_BOT_USERNAME = 'frxaiagentbot';

const API_BASE_URL =
  (import.meta as any).env?.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname.includes('github.io')
    ? 'https://frontend-eight-sable-66.vercel.app'
    : '');

function generateClientLeadCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AI-${year}${month}${day}-${randomSuffix}`;
}

function escapeHtml(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendDirectTelegramFallback(payload: LeadSubmissionPayload, leadCode: string): Promise<LeadSubmissionResponse> {
  const resident = payload.resident_info;
  const focus = payload.service_focus;

  const nowFormatted = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Tashkent',
  }).format(new Date());

  const detailsStr = Array.isArray(focus.service_details)
    ? focus.service_details.join(', ')
    : focus.service_details || 'Не указаны';

  const html = `🔥 <b>НОВАЯ ЗАЯВКА НА ИИ-УСЛУГИ (#${escapeHtml(leadCode)})</b>
📍 Источник: ${escapeHtml(payload.quiz_source || 'Сайт (Direct Failover)')}
📌 Статус: 🟡 Новая (прямой резервный шлюз)

🎯 <b>ВЫБРАННЫЕ УСЛУГИ:</b>
• <b>Направление:</b> ${escapeHtml(focus.primary_service || 'ИИ-автоматизация')}
• <b>Детали:</b> ${escapeHtml(detailsStr)}
• <b>Сфера:</b> ${escapeHtml(focus.industry || 'Не указана')}
• <b>Сроки:</b> ${escapeHtml(focus.timeline || 'Не указаны')}
• <b>Бюджет:</b> ${escapeHtml(focus.budget || 'Не указан')}

👤 <b>КОНТАКТЫ КЛИЕНТА:</b>
• <b>Имя:</b> ${escapeHtml(resident.name)}
• <b>Город:</b> ${escapeHtml(resident.city_input)}
• <b>Телефон:</b> <code>${escapeHtml(resident.phone)}</code>
• <b>Telegram:</b> ${resident.telegram_username ? escapeHtml(resident.telegram_username) : 'Не указан'}
• <b>Канал связи:</b> ${escapeHtml(resident.preferred_channel)}
• <b>Комментарий:</b> ${resident.comment ? escapeHtml(resident.comment) : 'Без комментария'}

🌐 <b>ТЕХНИЧЕСКИЕ ДАННЫЕ:</b>
• <b>Хост:</b> ${typeof window !== 'undefined' ? window.location.host : 'Browser'}
• <b>Время заявки:</b> ${nowFormatted} (UTC+5)`;

  const inlineKeyboard: any[] = [];
  if (resident.telegram_username) {
    const cleanUser = resident.telegram_username.replace(/^@/, '');
    inlineKeyboard.push([{ text: '💬 Написать клиенту', url: `https://t.me/${cleanUser}` }]);
  }
  inlineKeyboard.push([
    { text: '🤖 Открыть бота', url: `https://t.me/${TELEGRAM_BOT_USERNAME}?start=lead_${leadCode}` }
  ]);

  const tgRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_ADMIN_CHAT_ID,
      text: html,
      parse_mode: 'HTML',
      reply_markup: { inline_keyboard: inlineKeyboard },
      link_preview_options: { is_disabled: true },
    }),
  });

  if (!tgRes.ok) {
    const errText = await tgRes.text().catch(() => '');
    console.error('Direct Telegram API failed:', errText);
    throw new Error('Не удалось отправить заявку. Пожалуйста, напишите нам напрямую в Telegram @' + TELEGRAM_BOT_USERNAME);
  }

  return {
    success: true,
    lead_id: leadCode,
    bot_deep_link: `https://t.me/${TELEGRAM_BOT_USERNAME}?start=lead_${leadCode}`,
  };
}

export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResponse> {
  const leadCode = generateClientLeadCode();

  // Try Vercel Serverless API first if available
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    let data: any = null;
    try {
      data = await response.json();
    } catch {
      // response wasn't JSON
    }

    if (response.ok && data && data.success) {
      return data as LeadSubmissionResponse;
    }

    if (response.status === 429) {
      throw new Error('Вы уже отправили несколько заявок. Пожалуйста, напишите нам напрямую в Telegram.');
    }
  } catch (err: any) {
    if (err.message && err.message.includes('несколько заявок')) {
      throw err;
    }
    console.warn('Vercel API endpoint unavailable, activating direct Telegram fallback:', err);
  }

  // Resilient Fallback: direct to Telegram Bot API
  return await sendDirectTelegramFallback(payload, leadCode);
}
