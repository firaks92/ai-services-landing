export type Language = 'ru' | 'uz' | 'en';
export type Currency = 'usd' | 'uzs';

// Standard exchange rate: 1 USD = 12,850 UZS
export const USD_TO_UZS = 12850;

export function formatPrice(usdAmount: number, currency: Currency): string {
  if (currency === 'usd') {
    return `$${usdAmount.toLocaleString('en-US')}`;
  }
  const uzs = Math.round(usdAmount * USD_TO_UZS);
  return `${uzs.toLocaleString('ru-RU')} so'm`;
}

export const translations = {
  ru: {
    // Header
    nav_services: 'Каталог узлов',
    nav_cases: 'Кейсы и ROI',
    nav_process: 'Процесс запуска',
    nav_faq: 'FAQ',
    desk_online: 'DESK ONLINE',
    btn_select_node: 'Подобрать узел',
    approx_time: '~60с',

    // Hero & Switchers
    flight_controller_tag: '[ РЕЖИМ МАСШТАБА СИСТЕМЫ // FLIGHT CONTROLLER ]',
    auto_tuning: '● АВТОМАТИЧЕСКАЯ ПОДСТРОЙКА АРХИТЕКТУРЫ',
    tier_startup_title: 'Стартап & Экспресс',
    tier_startup_sub: 'Запуск за 3–7 дней',
    tier_growth_title: 'E-com & Продажи',
    tier_growth_sub: 'Запуск за 1–2 недели',
    tier_enterprise_title: 'Enterprise & RAG',
    tier_enterprise_sub: 'Запуск за 2–4 недели',

    hero_title_pre: 'Внедряем ИИ-системы, которые',
    hero_title_highlight_growth: 'сокращают рутину на 60%',
    hero_title_post_growth: 'и продают 24/7 без выходных',
    hero_desc_growth: 'Без шаблонных ботов и абстрактных обещаний. Проектируем и интегрируем прикладные нейросети с вашей CRM, базой знаний и регламентами за 1–3 недели.',
    hero_cta_quiz: 'Подобрать ИИ-систему за 60 секунд',
    hero_cta_roi: 'Смотреть расчет ROI',
    badge_guarantee: 'Гарантия по договору',
    badge_fixed_quote: 'Фиксированная смета и сроки',

    // Dashboard
    dash_title: 'AI.ENGINE DASHBOARD',
    dash_subtitle: 'ПРИБОРНАЯ ПАНЕЛЬ АВТОНОМНОГО БИЗНЕСА',
    dash_live: 'LIVE',
    dash_tab_revenue: 'Выручка & Лиды',
    dash_tab_hours: 'Экономия ФОТ',
    dash_tab_speed: 'Скорость отклика',
    dash_metric_dynamics: 'ДИНАМИКА ЭФФЕКТИВНОСТИ',
    dash_load_distribution: 'РАСПРЕДЕЛЕНИЕ НАГРУЗКИ',
    dash_autonomous: 'АВТОНОМНО',
    dash_team_activity: 'АКТИВНОСТЬ ИНЖЕНЕРОВ И БОТОВ // РЕАЛЬНОЕ ВРЕМЯ',
    dash_online_count: '3 ОНЛАЙН В СИСТЕМЕ',
    dash_cta_title: 'Хотите такой же дашборд и ИИ-автоматизацию для своей компании?',
    dash_cta_sub: 'Рассчитайте внедрение под ключ за 60 секунд со сметой и архитектурой',
    dash_cta_btn: 'Сконфигурировать ИИ-систему',

    // Quick launch strip
    quick_choice_label: 'БЫСТРЫЙ ВЫБОР УЗЛА // НАЖМИТЕ ДЛЯ ПЕРЕХОДА К ПАРАМЕТРАМ:',
    quick_choice_sub: 'ВЫБЕРИТЕ ВАШУ ЗАДАЧУ',
    node_chatbots: 'Умные чат-боты',
    node_rag: 'RAG-базы знаний',
    node_automation: 'Автоматизация CRM',
    node_content: 'Генерация контента',
    node_audit: 'ИИ-аудит под ключ',

    // Services Catalog
    catalog_tag: '[ 01 // ИНЖЕНЕРНЫЕ УЗЛЫ СИСТЕМЫ ]',
    catalog_title: 'Модульная архитектура для вашего бизнеса',
    catalog_mode_label: 'Режим отображения:',
    catalog_mode_effect: 'Бизнес-эффект & ROI',
    catalog_mode_stack: 'Стек & Интеграции',
    catalog_configure_btn: 'Сконфигурировать узел',

    // Cases & ROI
    cases_tag: '[ 02 // ПРОТОКОЛЫ ВНЕДРЕНИЙ И ОКУПАЕМОСТЬ ]',
    cases_title: 'Реальные цифры окупаемости в бизнесе',
    cases_verified_note: 'ДАННЫЕ ЗАФИКСИРОВАНЫ ПО РЕЗУЛЬТАТАМ 30–90 ДНЕЙ РАБОТЫ',
    calc_badge: 'ИНТЕРАКТИВНЫЙ КАЛЬКУЛЯТОР ВАШЕЙ ВЫГОДЫ',
    calc_title: 'Сколько ваш бизнес сэкономит на рутине?',
    calc_desc: 'Передвиньте ползунок количества сотрудников в поддержке или продажах, чтобы увидеть расчет сохраненного фонда оплаты труда.',
    calc_operators_label: 'Сотрудников на первой линии:',
    calc_salary_label: 'Средний ФОТ на сотрудника:',
    calc_annual_savings: 'ЭКОНОМИЯ ФОТ В ГОД',
    calc_month_suffix: '/ месяц',

    // Process
    process_tag: '[ 04 // ТЕХНОЛОГИЧЕСКИЙ МАРШРУТ ]',
    process_title: 'От первого ТЗ до боевого запуска в прод',
    process_desc: 'Никаких затяжных проектов на полгода. Поэтапная сдача с осязаемыми результатами на каждом шаге и гарантией по договору.',
    process_step_prefix: 'ЭТАП',
    process_result_label: 'РЕЗУЛЬТАТ ЭТАПА:',

    // FAQ
    faq_tag: '[ 05 // ЧАСТЫЕ ВОПРОСЫ И ОТВЕТЫ ]',
    faq_title: 'Ответы на главные вопросы и сомнения',
    faq_desc: 'Если у вас есть специфическая задача, нестандартная база данных или закрытый контур — задайте вопрос напрямую нашему архитектору.',
    faq_btn_ask: 'Задать вопрос инженеру в Telegram',

    // Footer
    footer_desc: 'Инженерное бюро по разработке и внедрению прикладных решений на базе нейросетей, RAG-баз данных и автоматизации CRM для бизнеса.',
    footer_engineer_online: 'Дежурный инженер на связи в Telegram',
    footer_sections: 'РАЗДЕЛЫ СИСТЕМЫ',
    footer_direct_contact: 'ПРЯМОЙ КОНТАКТ',
    footer_contact_desc: 'Хотите задать вопрос напрямую инженеру или отправить файл ТЗ? Напишите нам в Telegram-бот:',
    footer_rights: '© 2026 AI.STUDIO. Все права защищены. Инженерия ИИ для бизнеса.',
    footer_privacy: 'Политика конфиденциальности',
  },

  uz: {
    // Header
    nav_services: 'Xizmatlar katalogi',
    nav_cases: 'Keyslar va ROI',
    nav_process: 'Ishga tushirish',
    nav_faq: 'Savollar (FAQ)',
    desk_online: 'MUHANDIS ALOQADA',
    btn_select_node: 'Tizimni tanlash',
    approx_time: '~60s',

    // Hero & Switchers
    flight_controller_tag: '[ TIZIM KO‘LAMI BOSHQARUVI // FLIGHT CONTROLLER ]',
    auto_tuning: '● ARXITEKTURA AVTOMATIK MOSLASHADI',
    tier_startup_title: 'Startap & Ekspress',
    tier_startup_sub: '3–7 kunda ishga tushirish',
    tier_growth_title: 'E-com & Sotuvlar',
    tier_growth_sub: '1–2 haftada tayyor',
    tier_enterprise_title: 'Enterprise & RAG',
    tier_enterprise_sub: '2–4 haftada to‘liq tizim',

    hero_title_pre: 'Biznesingiz uchun',
    hero_title_highlight_growth: 'rutinani 60% ga qisqartiruvchi',
    hero_title_post_growth: 'va 24/7 sotuvchi sunʼiy intellekt tizimlari',
    hero_desc_growth: 'Shablon botlarsiz. Neyrotarmoqlarni CRM, bilimlar bazasi va biznes qoidalaringiz bilan 1–3 haftada kafolat bilan integratsiya qilamiz.',
    hero_cta_quiz: 'AI-tizimni 60 soniyada tanlash',
    hero_cta_roi: 'ROI hisobini ko‘rish',
    badge_guarantee: 'Shartnoma bo‘yicha kafolat',
    badge_fixed_quote: 'Aniq smeta va muddatlar',

    // Dashboard
    dash_title: 'AI.ENGINE DASHBOARD',
    dash_subtitle: 'AVTONOM BIZNES BOSHQARUV PANELI',
    dash_live: 'JONLI EFIR',
    dash_tab_revenue: 'Daromad & Lidlar',
    dash_tab_hours: 'Xarajat tejamkorligi',
    dash_tab_speed: 'Javob tezligi',
    dash_metric_dynamics: 'SAMARADORLIK DINAMIKASI',
    dash_load_distribution: 'YUKLAMA TAQSIMOTI',
    dash_autonomous: 'AVTONOM',
    dash_team_activity: 'MUHANDISLAR VA BOTLAR FAOLLIGI // REAL VAQTDA',
    dash_online_count: '3 TA TIZIMDA FAOL',
    dash_cta_title: 'Kompaniyangiz uchun xuddi shunday AI-boshqaruv panelini xohlaysizmi?',
    dash_cta_sub: '60 soniyada smeta va arxitekturani hisoblab chiqing',
    dash_cta_btn: 'AI-tizimni sozlash',

    // Quick launch strip
    quick_choice_label: 'YO‘NALISHNI TEZKOR TANLASH // PARAMETRLARGA O‘TISH:',
    quick_choice_sub: 'VAZIFANGIZNI TANLANG',
    node_chatbots: 'Aqlli chat-botlar',
    node_rag: 'RAG bilimlar bazasi',
    node_automation: 'CRM avtomatlashtirish',
    node_content: 'Kontent generatsiyasi',
    node_audit: 'AI-audit noldan',

    // Services Catalog
    catalog_tag: '[ 01 // TIZIMNING MUHANDISLIK MODULLARI ]',
    catalog_title: 'Biznesingiz uchun modulli arxitektura',
    catalog_mode_label: 'Ko‘rinish rejimi:',
    catalog_mode_effect: 'Biznes-effekt & ROI',
    catalog_mode_stack: 'Texnologiyalar steki',
    catalog_configure_btn: 'Modulni sozlash',

    // Cases & ROI
    cases_tag: '[ 02 // AMALIY KEYSLAR VA QOPLANISH ]',
    cases_title: 'Biznesda o‘zini oqlashning real raqamlari',
    cases_verified_note: '30–90 KUNLIK ISH NATIJALARI ASOSIDA TASDIQLANGAN',
    calc_badge: 'FOYDANI INTERAKTIV HISOBLAGICH',
    calc_title: 'Biznesingiz rutinada qancha tejaydi?',
    calc_desc: 'Mijozlarga xizmat ko‘rsatish xodimlari sonini belgilang va tejalgan maosh fondini ko‘ring.',
    calc_operators_label: 'Birinchi liniya xodimlari:',
    calc_salary_label: 'Bitta xodimning o‘rtacha maoshi:',
    calc_annual_savings: 'YILLIK TEJALGAN MABLAG‘',
    calc_month_suffix: '/ oyiga',

    // Process
    process_tag: '[ 04 // TEXNOLOGIK BOSQICHLAR ]',
    process_title: 'Texnik topshiriqdan ishlab chiqarishgacha',
    process_desc: 'Oylarga cho‘ziladigan loyihalarsiz. Har bir bosqichda aniq natijalar va shartnoma kafolati.',
    process_step_prefix: 'BOSQICH',
    process_result_label: 'BOSQICH NATIJASI:',

    // FAQ
    faq_tag: '[ 05 // KO‘P BERILADIGAN SAVOLLAR ]',
    faq_title: 'Asosiy savollarga aniq javoblar',
    faq_desc: 'Maxsus talablaringiz yoki yopiq korporativ serverlaringiz bo‘lsa — bosh muhandisimizga to‘g‘ridan-to‘g‘ri yozing.',
    faq_btn_ask: 'Telegramda muhandisga savol berish',

    // Footer
    footer_desc: 'Neyrotarmoqlar, RAG bilimlar bazasi va CRM avtomatlashtirish asosida biznes uchun amaliy yechimlar yaratish muhandislik byurosi.',
    footer_engineer_online: 'Navbatchi muhandis Telegramda aloqada',
    footer_sections: 'TIZIM BO‘LIMLARI',
    footer_direct_contact: 'TO‘G‘RIDAN-TO‘G‘RI ALOQA',
    footer_contact_desc: 'Muhandis bilan to‘g‘ridan-to‘g‘ri bog‘lanmoqchimisiz? Telegram-botimizga yozing:',
    footer_rights: '© 2026 AI.STUDIO. Barcha huquqlar himoyalangan. Biznes uchun sunʼiy intellekt.',
    footer_privacy: 'Maxfiylik siyosati',
  },

  en: {
    // Header
    nav_services: 'Services & Nodes',
    nav_cases: 'Cases & ROI',
    nav_process: 'Launch Process',
    nav_faq: 'FAQ',
    desk_online: 'DESK ONLINE',
    btn_select_node: 'Configure Node',
    approx_time: '~60s',

    // Hero & Switchers
    flight_controller_tag: '[ SYSTEM SCALE CONTROLLER // FLIGHT DECK ]',
    auto_tuning: '● ARCHITECTURE AUTO-TUNING ACTIVE',
    tier_startup_title: 'Startup & Express',
    tier_startup_sub: 'Launch in 3–7 days',
    tier_growth_title: 'E-com & Sales',
    tier_growth_sub: 'Launch in 1–2 weeks',
    tier_enterprise_title: 'Enterprise & RAG',
    tier_enterprise_sub: 'Launch in 2–4 weeks',

    hero_title_pre: 'We deploy turnkey AI systems that',
    hero_title_highlight_growth: 'cut operational routine by 60%',
    hero_title_post_growth: 'and drive sales 24/7 autonomously',
    hero_desc_growth: 'No cookie-cutter bots or empty promises. We architect and integrate custom LLMs with your CRM, knowledge base, and workflows in 1–3 weeks with strict contract SLAs.',
    hero_cta_quiz: 'Configure AI System in 60s',
    hero_cta_roi: 'View ROI Breakdown',
    badge_guarantee: 'Contractually Guaranteed SLA',
    badge_fixed_quote: 'Fixed-Price & Fixed-Timeline',

    // Dashboard
    dash_title: 'AI.ENGINE DASHBOARD',
    dash_subtitle: 'AUTONOMOUS BUSINESS FLIGHT DECK',
    dash_live: 'LIVE STREAM',
    dash_tab_revenue: 'Revenue & Leads',
    dash_tab_hours: 'Payroll Savings',
    dash_tab_speed: 'Response Speed',
    dash_metric_dynamics: 'EFFICIENCY DYNAMICS',
    dash_load_distribution: 'WORKLOAD ALLOCATION',
    dash_autonomous: 'AUTONOMOUS',
    dash_team_activity: 'ENGINEER & AGENT ACTIVITY // REAL-TIME',
    dash_online_count: '3 ONLINE IN SYSTEM',
    dash_cta_title: 'Want this autonomous AI dashboard deployed for your company?',
    dash_cta_sub: 'Calculate your turnaround time, architecture, and quote in 60 seconds',
    dash_cta_btn: 'Configure AI Architecture',

    // Quick launch strip
    quick_choice_label: 'QUICK FOCUS SELECTOR // CLICK TO JUMP TO PARAMETERS:',
    quick_choice_sub: 'SELECT YOUR OBJECTIVE',
    node_chatbots: 'Smart AI Chatbots',
    node_rag: 'RAG Knowledge Bases',
    node_automation: 'CRM & Workflow Automation',
    node_content: 'AI Content Generation',
    node_audit: 'Turnkey AI Audit & R&D',

    // Services Catalog
    catalog_tag: '[ 01 // ENGINEERING SYSTEM NODES ]',
    catalog_title: 'Modular AI Architecture for Modern Enterprises',
    catalog_mode_label: 'View Perspective:',
    catalog_mode_effect: 'Business Impact & ROI',
    catalog_mode_stack: 'Tech Stack & APIs',
    catalog_configure_btn: 'Configure Node Spec',

    // Cases & ROI
    cases_tag: '[ 02 // DEPLOYMENT PROTOCOLS & PAYBACK ]',
    cases_title: 'Audited Financial Returns Post-Deployment',
    cases_verified_note: 'VERIFIED DATA COLLECTED OVER 30–90 DAYS OF LIVE RUNTIME',
    calc_badge: 'INTERACTIVE PAYROLL SAVINGS ESTIMATOR',
    calc_title: 'How much will your business save on routine?',
    calc_desc: 'Adjust your support/sales headcount to calculate immediate annual payroll reduction.',
    calc_operators_label: 'Frontline Representatives:',
    calc_salary_label: 'Average Salary per Rep:',
    calc_annual_savings: 'ANNUAL PAYROLL SAVED',
    calc_month_suffix: '/ month',

    // Process
    process_tag: '[ 04 // DEPLOYMENT ROADMAP ]',
    process_title: 'From Technical Spec to Battle-Tested Production',
    process_desc: 'No drawn-out multi-month consultant delays. Phased sprint deliverables with contractual guarantees.',
    process_step_prefix: 'PHASE',
    process_result_label: 'PHASE DELIVERABLE:',

    // FAQ
    faq_tag: '[ 05 // FREQUENTLY ASKED QUESTIONS ]',
    faq_title: 'Clear Answers to Strategic Questions',
    faq_desc: 'Have an air-gapped database, unique ERP, or enterprise security audit requirements? Talk directly with our Lead Architect.',
    faq_btn_ask: 'Chat with Lead Engineer in Telegram',

    // Footer
    footer_desc: 'Engineering studio designing and deploying turnkey AI solutions, private RAG knowledge pipelines, and automated CRM architectures for high-growth businesses.',
    footer_engineer_online: 'Lead Duty Engineer Online on Telegram',
    footer_sections: 'SYSTEM DIRECTORY',
    footer_direct_contact: 'DIRECT CHANNEL',
    footer_contact_desc: 'Need to submit a technical brief or review enterprise compliance? Message our Telegram bot:',
    footer_rights: '© 2026 AI.STUDIO. All rights reserved. Applied AI Systems Engineering.',
    footer_privacy: 'Privacy Policy',
  },
};
