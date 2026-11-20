import { escapeHtml } from '../utils/escapeHtml.js';
import type { Lead } from '@prisma/client';

export function formatLeadMessage(lead: Lead): string {
  let detailsText = '';
  try {
    const details = JSON.parse(lead.serviceDetails) as string[];
    detailsText = details.join(', ');
  } catch {
    detailsText = lead.serviceDetails;
  }

  let utmText = 'Прямой заход';
  if (lead.utmData) {
    try {
      const utm = JSON.parse(lead.utmData);
      const parts = [];
      if (utm.source) parts.push(utm.source);
      if (utm.medium) parts.push(utm.medium);
      if (utm.campaign) parts.push(`(${utm.campaign})`);
      if (parts.length > 0) utmText = parts.join(' / ');
    } catch {
      // fallback
    }
  }

  // Quiz source label
  const sourceLabels: Record<string, string> = {
    entry_popup: 'Входной квиз (Popup)',
    inline_quiz: 'Встроенный квиз (Сайт)',
    service_card: 'Карточка услуги (Каталог)',
    exit_intent: 'Exit-Intent (Уход с сайта)',
  };
  const sourceLabel = sourceLabels[lead.quizSource] || lead.quizSource;

  // Status badge
  let statusBadge = '🟡 Новая';
  if (lead.status === 'IN_PROGRESS') {
    statusBadge = `🔵 В работе (${lead.assignedManager || 'Менеджер'})`;
  } else if (lead.status === 'COMPLETED') {
    statusBadge = `🟢 Завершена (${lead.assignedManager || 'Менеджер'})`;
  } else if (lead.status === 'SPAM') {
    statusBadge = `🚫 Спам`;
  }

  // Formatting date
  const dateFormatted = new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: lead.timezone || 'Asia/Tashkent',
  }).format(lead.createdAt);

  const geoString = [lead.geoCountry, lead.geoCity].filter(Boolean).join(', ') || 'Локальная сеть / Не определен';

  return `🔥 <b>НОВАЯ ЗАЯВКА НА ИИ-УСЛУГИ (#${escapeHtml(lead.leadCode)})</b>
📍 Источник: ${escapeHtml(sourceLabel)}
📌 Статус: ${statusBadge}

🎯 <b>ВЫБРАННЫЕ УСЛУГИ:</b>
• <b>Направление:</b> ${escapeHtml(lead.primaryService)}
• <b>Детали:</b> ${escapeHtml(detailsText || 'Не указаны')}
• <b>Сфера:</b> ${escapeHtml(lead.industry)}
• <b>Сроки:</b> ${escapeHtml(lead.timeline)}
• <b>Бюджет:</b> ${escapeHtml(lead.budget)}

👤 <b>ИНФОРМАЦИЯ О ЖИТЕЛЕ / КЛИЕНТЕ:</b>
• <b>Имя:</b> ${escapeHtml(lead.residentName)}
• <b>Город / Район:</b> ${escapeHtml(lead.cityInput)}
• <b>Телефон:</b> <code>${escapeHtml(lead.phone)}</code>
• <b>Telegram:</b> ${lead.telegramUsername ? escapeHtml(lead.telegramUsername) : 'Не указан'}
• <b>Удобный канал:</b> ${escapeHtml(lead.preferredChannel)}
• <b>Комментарий:</b> ${lead.comment ? escapeHtml(lead.comment) : 'Без комментария'}

🌐 <b>ГЕО И ТЕХНИЧЕСКИЕ ДАННЫЕ:</b>
• <b>Geo-IP:</b> ${escapeHtml(geoString)} (IP: <code>${escapeHtml(lead.ipAddress)}</code>)
• <b>Часовой пояс:</b> ${escapeHtml(lead.timezone || 'UTC+5')}
• <b>Устройство:</b> ${escapeHtml(lead.deviceInfo || 'Desktop')} | Язык: ${escapeHtml(lead.browserLanguage || 'ru-RU')}
• <b>Трафик:</b> ${escapeHtml(utmText)}
• <b>Время заявки:</b> ${dateFormatted}`;
}
