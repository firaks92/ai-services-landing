function escapeHtml(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateLeadCode(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AI-${year}${month}${day}-${randomSuffix}`;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // 1. Honeypot check
    if (body.security?.honeypot && body.security.honeypot.trim().length > 0) {
      const fakeCode = generateLeadCode();
      return res.status(201).json({
        success: true,
        lead_id: fakeCode,
        bot_deep_link: `https://t.me/frxaiagentbot?start=lead_${fakeCode}`,
      });
    }

    const leadCode = generateLeadCode();
    const botToken = process.env.TELEGRAM_BOT_TOKEN || '9084035616:AAG3UVqWsKnCDzK1mAQFvIGF0eiUQnJ2_u0';
    const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID || '-5494937418';
    const botUsername = process.env.TELEGRAM_BOT_USERNAME || 'frxaiagentbot';

    const sourceLabels: Record<string, string> = {
      entry_popup: 'Входной квиз (Popup)',
      inline_quiz: 'Встроенный квиз (Сайт)',
      service_card: 'Карточка услуги (Каталог)',
      exit_intent: 'Exit-Intent (Уход с сайта)',
    };
    const sourceLabel = sourceLabels[body.quiz_source] || body.quiz_source || 'Входной квиз (Vercel)';

    const residentName = body.resident_info?.name || 'Клиент';
    const cityInput = body.resident_info?.city_input || 'Не указан';
    const phone = body.resident_info?.phone || 'Не указан';
    const telegramUsername = body.resident_info?.telegram_username || '';
    const preferredChannel = body.resident_info?.preferred_channel || 'Telegram';
    const comment = body.resident_info?.comment || '';

    const primaryService = body.service_focus?.primary_service || 'ИИ-услуги';
    const serviceDetails = Array.isArray(body.service_focus?.service_details)
      ? body.service_focus.service_details.join(', ')
      : 'Не указаны';
    const industry = body.service_focus?.industry || 'Не указана';
    const timeline = body.service_focus?.timeline || 'Не указаны';
    const budget = body.service_focus?.budget || 'Не указан';

    // Geo & Traffic
    const geoCountry = req.headers['x-vercel-ip-country-name'] || req.headers['x-vercel-ip-country'] || 'Не определена';
    const geoCity = req.headers['x-vercel-ip-city'] ? decodeURIComponent(req.headers['x-vercel-ip-city']) : 'Не определен';
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '127.0.0.1';

    let utmText = 'Прямой заход';
    if (body.client_meta?.utm) {
      const utm = body.client_meta.utm;
      const parts = [];
      if (utm.source) parts.push(utm.source);
      if (utm.medium) parts.push(utm.medium);
      if (utm.campaign) parts.push(`(${utm.campaign})`);
      if (parts.length > 0) utmText = parts.join(' / ');
    }

    const nowFormatted = new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Tashkent',
    }).format(new Date());

    const htmlMessage = `🔥 <b>НОВАЯ ЗАЯВКА НА ИИ-УСЛУГИ (#${escapeHtml(leadCode)})</b>
📍 Источник: ${escapeHtml(sourceLabel)} (Vercel Production)
📌 Статус: 🟡 Новая

🎯 <b>ВЫБРАННЫЕ УСЛУГИ:</b>
• <b>Направление:</b> ${escapeHtml(primaryService)}
• <b>Детали:</b> ${escapeHtml(serviceDetails)}
• <b>Сфера:</b> ${escapeHtml(industry)}
• <b>Сроки:</b> ${escapeHtml(timeline)}
• <b>Бюджет:</b> ${escapeHtml(budget)}

👤 <b>ИНФОРМАЦИЯ О ЖИТЕЛЕ / КЛИЕНТЕ:</b>
• <b>Имя:</b> ${escapeHtml(residentName)}
• <b>Город / Район:</b> ${escapeHtml(cityInput)}
• <b>Телефон:</b> <code>${escapeHtml(phone)}</code>
• <b>Telegram:</b> ${telegramUsername ? escapeHtml(telegramUsername) : 'Не указан'}
• <b>Удобный канал:</b> ${escapeHtml(preferredChannel)}
• <b>Комментарий:</b> ${comment ? escapeHtml(comment) : 'Без комментария'}

🌐 <b>ГЕО И ТЕХНИЧЕСКИЕ ДАННЫЕ:</b>
• <b>Geo-IP:</b> ${escapeHtml(geoCountry)}, ${escapeHtml(geoCity)} (IP: <code>${escapeHtml(clientIp)}</code>)
• <b>Трафик:</b> ${escapeHtml(utmText)}
• <b>Время заявки:</b> ${nowFormatted} (UTC+5)`;

    // Inline buttons for managers
    const inlineKeyboard: any[] = [];
    if (telegramUsername) {
      const cleanUsername = telegramUsername.replace(/^@/, '');
      inlineKeyboard.push([{ text: '💬 Написать в Telegram', url: `https://t.me/${cleanUsername}` }]);
    }
    inlineKeyboard.push([
      { text: '✅ Заявка принята через Vercel', callback_data: `lead:info:${leadCode}` }
    ]);

    // Send to Telegram
    const tgResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: adminChatId,
        text: htmlMessage,
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: inlineKeyboard,
        },
        link_preview_options: {
          is_disabled: true,
        },
      }),
    });

    const tgData = await tgResponse.json();
    if (!tgResponse.ok) {
      console.error('Telegram API error:', tgData);
    }

    const botDeepLink = `https://t.me/${botUsername}?start=lead_${leadCode}`;

    return res.status(201).json({
      success: true,
      lead_id: leadCode,
      bot_deep_link: botDeepLink,
    });
  } catch (error: any) {
    console.error('Error handling lead submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка при отправке заявки: ' + (error?.message || 'Неизвестная ошибка'),
    });
  }
}
