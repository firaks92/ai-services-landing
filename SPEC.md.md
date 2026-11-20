# Техническая спецификация (SPEC): Лендинг «ИИ-услуги» и Telegram-бот на Node.js

**Версия:** 1.0  
**Основание:** PRD `ai_services_landing_prd.md` (v1.0)  
**Целевая платформа бэкенда и бота:** Node.js (LTS) + TypeScript  

---

## 1. Технологический стек

Для обеспечения высокой скорости ответа ($< 3$ сек), строгой типизации данных о жителях/клиентах и надежной работы с Telegram Bot API используется следующий стек:

| Слой | Технология / Библиотека | Назначение |
| :--- | :--- | :--- |
| **Runtime** | Node.js `v22 LTS` | Среда выполнения бэкенда и бота |
| **Язык** | TypeScript `5.x` | Строгая типизация контрактов и DTO |
| **HTTP-сервер (API)** | `Fastify` `5.x` | Высокопроизводительный REST API, встроенная поддержка `trustProxy` |
| **Telegram Bot Framework** | `grammY` `1.x` | Современный TS-first фреймворк для Telegram Bot API (Webhook + Polling, плагины retry) |
| **Валидация схем** | `Zod` | Валидация входящих заявок с квиза и переменных окружения |
| **База данных и ORM** | `PostgreSQL` (или `SQLite` для MVP) + `Prisma ORM` | Резервное хранение всех заявок, статусов и связей с Telegram-сообщениями |
| **Определение Geo-IP** | `@maxmind/geoip2-node` (локальная база `GeoLite2-City.mmdb`) | Мгновенное (офлайн, $< 5$ мс) определение страны, города и часового пояса жителя без лимитов внешних API |
| **Парсинг устройств** | `ua-parser-js` | Определение типа устройства, ОС и браузера из заголовка `User-Agent` |
| **Защита и лимиты** | `@fastify/rate-limit`, `@fastify/cors`, `@fastify/helmet` | Rate Limiting, CORS, HTTP-заголовки безопасности |
| **Логирование** | `Pino` (встроен в Fastify) | Структурированные JSON-логи для мониторинга и отладки |
| **Фронтенд** | Vanilla ES6+ / React (Vite) + Tailwind CSS | Лендинг, машина состояний квиза, сбор UTM |

---

## 2. Архитектура системы

### 2.1. Схема взаимодействия компонентов

```text
[Посетитель (Браузер)]
   │  1. GET /api/v1/geo (автоподстановка города жителя)
   │  2. POST /api/v1/leads (ответы квиза + контакты + UTM + Turnstile token)
   ▼
[Nginx / Cloudflare (HTTPS, TLS 1.2+, X-Forwarded-For)]
   │
   ▼
[Node.js Application (Fastify + grammY)]
   ├── API Layer (Zod Validation, Honeypot, Rate Limit, Turnstile Verify)
   ├── Enrichment Service (MaxMind Geo-IP + UA-Parser + ID Generator)
   ├── Storage Layer (Prisma -> PostgreSQL / SQLite)  <-- Гарантированное сохранение
   └── Telegram Bot Service (grammY)
          ├── Outbound: Отправка HTML-заявки + Inline-кнопки (Retry 2s/5s/15s)
          └── Inbound (Webhook):
                 ├── Callback-кнопки менеджеров ("Взять в работу", "Завершить")
                 └── Deep-link /start lead_<id> от клиента с экрана благодарности
```

### 2.2. Принцип обеспечения SLA по задержке ($< 3$ сек)

Чтобы пользователь не ждал окончания всех повторных попыток при кратковременных сбоях Telegram API:
1. Сервер валидирует заявку, обогащает ее данными Geo-IP и **синхронно сохраняет в БД** (занимает $\sim 20$–$50$ мс).
2. Выполняется **первая попытка** отправки в Telegram с таймаутом $2\,000$ мс.
3. Если первая попытка успешна — `telegramMessageId` сохраняется в БД, клиенту возвращается `201 Created`.
4. Если Telegram API недоступен или превысил таймаут — клиенту все равно возвращается `201 Created` (так как заявка надежно сохранена в БД), а фоновый планировщик выполняет до $3$ повторных попыток с задержками $2\text{ с} \rightarrow 5\text{ с} \rightarrow 15\text{ с}$.

---

## 3. Структура проекта (Node.js)

```text
ai-services-backend/
├── prisma/
│   ├── schema.prisma           # Схема БД (Lead, LeadStatus)
│   └── migrations/             # Миграции БД
├── data/
│   └── GeoLite2-City.mmdb      # Локальная база Geo-IP (обновляется по cron)
├── src/
│   ├── config/
│   │   └── env.ts              # Валидация .env через Zod
│   ├── bot/
│   │   ├── bot.ts              # Инициализация grammY Bot
│   │   ├── formatter.ts        # Генерация HTML-сообщений и экранирование
│   │   ├── keyboards.ts        # Inline-кнопки для менеджеров
│   │   └── handlers/
│   │       ├── callbacks.ts    # Обработка нажатий ("Взять в работу", "Спам" и др.)
│   │       └── start.ts        # Обработка /start lead_<id> от клиента
│   ├── api/
│   │   ├── server.ts           # Настройка Fastify, CORS, Helmet, RateLimit
│   │   ├── routes/
│   │   │   ├── geo.route.ts    # GET /api/v1/geo
│   │   │   ├── leads.route.ts  # POST /api/v1/leads
│   │   │   └── health.route.ts # GET /api/v1/health
│   │   └── schemas/
│   │       └── lead.schema.ts  # Zod-схемы валидации квиза
│   ├── services/
│   │   ├── geo.service.ts      # Обертка над MaxMind GeoLite2
│   │   ├── lead.service.ts     # Бизнес-логика создания, генерации ID и сохранения
│   │   ├── notifier.service.ts # Отправка в Telegram + Retry с экспоненциальной задержкой
│   │   └── turnstile.service.ts# Проверка Cloudflare Turnstile токена
│   ├── utils/
│   │   ├── escapeHtml.ts       # Безопасное экранирование <, >, &
│   │   └── ip.ts               # Извлечение реального IP жителя
│   └── index.ts                # Точка входа (Graceful Shutdown)
├── .env.example
├── Dockerfile
├── docker-compose.yml
├── package.json
└── tsconfig.json
```

---

## 4. Схема базы данных (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "postgresql" // Для быстрого старта допускается "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum LeadStatus {
  NEW
  IN_PROGRESS
  COMPLETED
  SPAM
}

enum DeliveryStatus {
  PENDING
  SENT
  FAILED
}

model Lead {
  id                String         @id @default(cuid())
  leadCode          String         @unique // Формат: AI-YYYYMMDD-XXXX
  quizSource        String         // entry_popup | inline_quiz | service_card | exit_intent

  // Фокус на ИИ-услугах
  serviceCode       String         // chatbot | automation | content | rag_analytics | custom_audit
  primaryService    String
  serviceDetails    Json           // string[] - ответы адаптивной ветки (Шаг 2)
  industry          String
  timeline          String
  budget            String

  // Информация о жителе / клиенте
  residentName      String
  cityInput         String
  preferredChannel  String         // Telegram | Phone | WhatsApp
  phone             String
  telegramUsername  String?
  comment           String?

  // Геолокация и технические метаданные
  ipAddress         String
  geoCountry        String?
  geoRegion         String?
  geoCity           String?
  timezone          String?
  deviceInfo        String?
  browserLanguage   String?
  pageUrl           String?
  referrer          String?
  utmData           Json?          // { source, medium, campaign, term, content }

  // Интеграция с Telegram-ботом и CRM-статусы
  status            LeadStatus     @default(NEW)
  deliveryStatus    DeliveryStatus @default(PENDING)
  deliveryAttempts  Int            @default(0)
  telegramChatId    String?
  telegramMessageId Int?
  assignedManager   String?        // @username или имя менеджера, взявшего заявку
  clientTelegramId  String?        // Заполняется при переходе клиента по /start lead_<leadCode>

  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  @@index([status, createdAt])
  @@index([deliveryStatus])
}
```

---

## 5. Спецификация REST API

Базовый префикс всех эндпоинтов: `/api/v1`. Формат обмена: `application/json`.

### 5.1. `GET /api/v1/geo` — Автоопределение города жителя

Используется фронтендом при открытии Шага 5 квиза для автоподстановки поля «Город / Район проживания».

* **Логика:** Извлекает реальный IP клиента (учитывая `CF-Connecting-IP` / `X-Forwarded-For`), запрашивает `GeoLite2-City.mmdb` с локализацией `ru`.
* **Ответ `200 OK`:**
  ```json
  {
    "country": "Узбекистан",
    "region": "Ташкент",
    "city": "Ташкент",
    "timezone": "Asia/Tashkent",
    "suggested_location": "Ташкент"
  }
  ```
* **Fallback:** Если IP локальный или отсутствует в базе, возвращаются `null`-поля без ошибки `500`, чтобы пользователь ввел город вручную.

### 5.2. `POST /api/v1/leads` — Прием заявки с квиза

* **Rate Limit:** Не более $3$ запросов за $10$ минут с одного IP-адреса. При превышении возвращается `429 Too Many Requests`.
* **Валидация (Zod Schema):**
  * `service_focus.service_code`: строго enum `['chatbot', 'automation', 'content', 'rag_analytics', 'custom_audit']`.
  * `service_focus.service_details`: массив строк, от $1$ до $10$ элементов.
  * `resident_info.name`: строка, `trim()`, длина от $2$ до $100$ символов.
  * `resident_info.city_input`: строка, `trim()`, длина от $2$ до $150$ символов.
  * `resident_info.preferred_channel`: enum `['Telegram', 'Phone', 'WhatsApp']`.
  * `resident_info.phone`: строка, очищается от пробелов/дефисов, соответствует формату E.164 (`^\+?[0-9]{9,15}$`).
  * `resident_info.telegram_username`: обязательно, если `preferred_channel === 'Telegram'`; валидация `^@?[a-zA-Z0-9_]{5,32}$` (нормализуется с префиксом `@`).
  * `resident_info.comment`: опционально, макс. $500$ символов.
  * `consent_accepted`: строго `true`.
  * `security.honeypot`: строго пустая строка `""` (если заполнено — возвращается фиктивный `200 OK`, заявка в БД и бот **не отправляется**).
  * `security.turnstile_token`: валидируется через `https://challenges.cloudflare.com/turnstile/v0/siteverify`.

* **Тело запроса (Request Body):**
  ```json
  {
    "quiz_source": "entry_popup",
    "service_focus": {
      "service_code": "chatbot",
      "primary_service": "ИИ-чат-бот / ИИ-продавец",
      "service_details": ["Telegram", "Instagram Direct", "Продавать и собирать заявки"],
      "industry": "Интернет-магазин / Маркетплейсы",
      "timeline": "В течение 1 месяца",
      "budget": "$500 – $1 500"
    },
    "resident_info": {
      "name": "Алишер Каримов",
      "city_input": "Ташкент, Мирзо-Улугбекский район",
      "preferred_channel": "Telegram",
      "phone": "+998901234567",
      "telegram_username": "@alisher_k",
      "comment": "Нужен бот для ответов по каталогу из 500 товаров"
    },
    "client_meta": {
      "language": "ru-RU",
      "page_url": "https://example.com/?utm_source=instagram&utm_campaign=ai_bots",
      "referrer": "https://l.instagram.com/",
      "utm": {
        "source": "instagram",
        "medium": "cpc",
        "campaign": "ai_bots",
        "term": null,
        "content": null
      }
    },
    "consent_accepted": true,
    "security": {
      "honeypot": "",
      "turnstile_token": "0.xxxxxxxxxxxxxxxxxxxx"
    }
  }
  ```

* **Ответы API:**
  * `201 Created` (Успех):
    ```json
    {
      "success": true,
      "lead_id": "AI-20261119-0042",
      "bot_deep_link": "https://t.me/YourAiServicesBot?start=lead_AI-20261119-0042"
    }
    ```
  * `400 Bad Request` — ошибка валидации полей (возвращается массив `errors: [{ field, message }]` для подсветки полей в UI).
  * `403 Forbidden` — провалена проверка Cloudflare Turnstile.
  * `429 Too Many Requests` — сработал Rate Limiter.
  * `500 Internal Server Error` — критическая ошибка сервера/БД.

### 5.3. `POST /api/v1/telegram/webhook` — Прием обновлений от Telegram

* Используется в production-режиме для `grammY` (`webhookCallback(bot, 'fastify')`).
* Защищен проверкой заголовка `X-Telegram-Bot-Api-Secret-Token` (значение сравнивается с `TELEGRAM_WEBHOOK_SECRET` из `.env`).

### 5.4. `GET /api/v1/health`

* Проверяет доступность БД и статус бота. Возвращает `200 OK` `{ "status": "ok", "uptime": 12345 }`.

---

## 6. Спецификация Telegram-бота (`grammY` + Node.js)

### 6.1. Режимы запуска

* **Development (`NODE_ENV=development`):** Long Polling (`bot.start()`), не требует публичного HTTPS-домена.
* **Production (`NODE_ENV=production`):** Webhook через Fastify на `https://<DOMAIN>/api/v1/telegram/webhook`. При старте приложения регистрируется вебхук через `bot.api.setWebhook(...)` с параметром `secret_token`.

### 6.2. Экранирование и форматирование уведомления

Перед подстановкой любых пользовательских данных (имя, город, комментарий, UTM) применяется функция `escapeHtml`:
* `&` $\rightarrow$ `&amp;`
* `<` $\rightarrow$ `&lt;`
* `>` $\rightarrow$ `&gt;`

Сообщение отправляется в `TELEGRAM_ADMIN_CHAT_ID` (поддерживается опциональный `TELEGRAM_TOPIC_ID` для групп с включенными темами/форумом) с `parse_mode: "HTML"` и `link_preview_options: { is_disabled: true }`.

**HTML-шаблон уведомления:**

```html
🔥 <b>НОВАЯ ЗАЯВКА НА ИИ-УСЛУГИ (#AI-20261119-0042)</b>
📍 Источник: Входной квиз (Popup)
📌 Статус: 🟡 Новая

🎯 <b>ВЫБРАННЫЕ УСЛУГИ:</b>
• <b>Направление:</b> ИИ-чат-бот / ИИ-продавец
• <b>Детали:</b> Telegram, Instagram Direct, Продавать и собирать заявки
• <b>Сфера:</b> Интернет-магазин / Маркетплейсы
• <b>Сроки:</b> В течение 1 месяца
• <b>Бюджет:</b> $500 – $1 500

👤 <b>ИНФОРМАЦИЯ О ЖИТЕЛЕ / КЛИЕНТЕ:</b>
• <b>Имя:</b> Алишер Каримов
• <b>Город / Район:</b> Ташкент, Мирзо-Улугбекский район
• <b>Телефон:</b> <code>+998901234567</code>
• <b>Telegram:</b> @alisher_k
• <b>Удобный канал:</b> Telegram
• <b>Комментарий:</b> Нужен бот для ответов по каталогу из 500 товаров

🌐 <b>ГЕО И ТЕХНИЧЕСКИЕ ДАННЫЕ:</b>
• <b>Geo-IP:</b> Узбекистан, Ташкент (IP: <code>203.0.113.45</code>)
• <b>Часовой пояс:</b> Asia/Tashkent
• <b>Устройство:</b> Mobile (iOS / Safari) | Язык: ru-RU
• <b>Трафик:</b> instagram / cpc (ai_bots)
• <b>Время заявки:</b> 19.11.2026 19:45
```

*(Использование тега `<code>` для телефона и IP позволяет менеджеру копировать их в один клик прямо в Telegram.)*

### 6.3. Inline-кнопки и интерактивное управление статусами

Под каждым сообщением о заявке формируется `InlineKeyboard`:

1. **Для статуса `NEW`:**
   * Ряд 1: `[ 💬 Написать в Telegram ]` (`url: https://t.me/<username>`, добавляется только если указан `telegramUsername`).
   * Ряд 2: `[ ✅ Взять в работу ]` (`callback_data: "lead:take:AI-20261119-0042"`) | `[ 🚫 Спам ]` (`callback_data: "lead:spam:AI-20261119-0042"`).

2. **Обработка нажатия `lead:take:<leadCode>`:**
   * Проверяется, что действие совершено в авторизованном админ-чате (`ctx.chat.id === TELEGRAM_ADMIN_CHAT_ID`).
   * В БД обновляются поля: `status = IN_PROGRESS`, `assignedManager = ctx.from.username ? '@' + ctx.from.username : ctx.from.first_name`.
   * Сообщение в Telegram редактируется (`ctx.editMessageText`): строка статуса меняется на `🔵 В работе (@manager_name, 19:47)`.
   * Клавиатура обновляется на: `[ 🏁 Завершить ]` (`lead:done:<leadCode>`) | `[ ↩️ Вернуть в новые ]` (`lead:reset:<leadCode>`).
   * Вызывается `ctx.answerCallbackQuery("Заявка закреплена за вами")`.

### 6.4. Обработка Deep-Link от клиента (`/start lead_<leadCode>`)

Когда житель на экране благодарности (Thank You Screen) нажимает кнопку «Перейти в Telegram-бот»:
1. Бот получает команду `/start lead_AI-20261119-0042`.
2. Бот ищет запись в БД по `leadCode`.
3. Если заявка найдена:
   * Сохраняет `clientTelegramId = String(ctx.from.id)` в БД.
   * Отправляет клиенту персональное приветствие:
     > *«Здравствуйте, Алишер! Мы уже получили вашу заявку #AI-20261119-0042 по направлению «ИИ-чат-бот / ИИ-продавец». Менеджер ознакомится с деталями и напишет вам в ближайшее время. Если хотите дополнить задачу — просто напишите ответным сообщением.»*
   * Отправляет **ответное сообщение (reply)** в админ-чат к исходной карточке заявки (`reply_parameters: { message_id: lead.telegramMessageId }`):
     > *«🔔 Клиент по заявке #AI-20261119-0042 зашел в бот (ID: `123456789`, @alisher_k).»*
4. Если клиент зашел без параметра (`/start`) — бот отправляет приветствие с кнопкой-ссылкой на квиз на сайте.

### 6.5. Механизм Retry (Отказоустойчивость)

Реализуется в `notifier.service.ts`:
* Конфигурация задержек: `RETRY_DELAYS_MS = [2000, 5000, 15000]`.
* При ошибке сети, `5xx` или `429 Too Many Requests` (учитывается `retry_after` от Telegram) задача ставится на повторный запуск.
* При успешной отправке `deliveryStatus` меняется на `SENT`.
* Если все $3$ попытки исчерпаны — `deliveryStatus` устанавливается в `FAILED`, ошибка логируется с уровнем `fatal` (для триггера алерта мониторинга), а данные остаются в БД.
* При перезапуске Node.js процесса запускается recovery-скрипт, который досылает все заявки со статусом `PENDING` или `FAILED` (не старше $24$ часов).

---

## 7. Контракт фронтенд-модуля квиза

### 7.1. Конфигурация ветвления (Data-Driven Quiz Engine)

Логика шагов описывается декларативным JSON-конфигом на клиенте, чтобы добавлять новые ИИ-услуги без переписывания кода UI:

```typescript
interface QuizBranchConfig {
  serviceCode: 'chatbot' | 'automation' | 'content' | 'rag_analytics' | 'custom_audit';
  label: string;
  step2Question: string;
  multiSelect: boolean;
  options: string[];
}
```

* При клике на карточку услуги на лендинге вызывается метод `openQuiz({ presetServiceCode: 'automation', source: 'service_card' })`, который устанавливает `step = 2` и предзаполняет ответ Шага 1.

### 7.2. Триггеры и хранение состояния на клиенте

* **Entry Popup:** `setTimeout` на $4\,000$ мс после события `load`. Перед показом проверяется ключ `localStorage.getItem('ai_quiz_dismissed_until')`.
* **Frequency Capping:** При закрытии модального окна без отправки записывается `Date.now() + 24 * 60 * 60 * 1000`.
* **UTM-трекинг:** При первом входе на сайт скрипт парсит `window.location.search` (`utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`) и `document.referrer`, сохраняя объект в `sessionStorage` (`ai_quiz_utm`), чтобы метки не потерялись при переходе по якорным ссылкам.
* **Аналитика:** На каждом переходе генерируется событие `window.dataLayer.push({ event, step_number, selected_service })` для GA4 / GTM / Яндекс.Метрики.

---

## 8. Безопасность и переменные окружения

### 8.1. Конфигурация `.env.example`

```dotenv
# Сервер
NODE_ENV=production
PORT=3000
HOST=0.0.0.0
FRONTEND_ORIGIN=https://your-ai-landing.com
TRUST_PROXY=true

# База данных
DATABASE_URL="postgresql://user:password@db:5432/ai_leads?schema=public"

# Telegram-бот
TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_BOT_USERNAME=YourAiServicesBot
TELEGRAM_ADMIN_CHAT_ID=-1001234567890
TELEGRAM_TOPIC_ID=
TELEGRAM_WEBHOOK_URL=https://api.your-ai-landing.com/api/v1/telegram/webhook
TELEGRAM_WEBHOOK_SECRET=super_secret_random_string_64_chars

# Защита от спама (Cloudflare Turnstile)
TURNSTILE_SECRET_KEY=0x4AAAAAAAxxxxxxxxxxxxxxxx
TURNSTILE_ENABLED=true

# Geo-IP
GEOIP_DB_PATH=./data/GeoLite2-City.mmdb
```

### 8.2. Обязательные требования безопасности

1. **Проксирование реального IP:** В Fastify обязательно включается `trustProxy: true`. В конфигурации Nginx должны передаваться заголовки `X-Real-IP` и `X-Forwarded-For`, иначе Rate Limiter и Geo-IP будут видеть IP прокси-сервера (`127.0.0.1`).
2. **Изоляция секретов:** Фронтенд не имеет доступа ни к `TELEGRAM_BOT_TOKEN`, ни к `TELEGRAM_ADMIN_CHAT_ID`.
3. **CORS:** Разрешены только методы `GET`, `POST`, `OPTIONS` с домена `FRONTEND_ORIGIN`.
4. **Очистка данных:** Ограничение максимального размера тела запроса Fastify (`bodyLimit: 32768` байт / $32\text{ КБ}$) для защиты от DoS-атак большими JSON-пейлоадами.

---

## 9. Развертывание и план тестирования

### 9.1. Деплой (Docker)

* Бэкенд и бот работают в едином Node.js контейнере (`node:22-alpine`, multi-stage build с компиляцией TypeScript и запуском `prisma migrate deploy`).
* База данных PostgreSQL разворачивается соседним сервисом в `docker-compose.yml` с постоянным volume (`pg_data`).
* Реализован **Graceful Shutdown** на сигналы `SIGINT` и `SIGTERM`: остановка приема новых HTTP-запросов, завершение текущих отправок в Telegram, закрытие пула соединений Prisma.

### 9.2. Чек-лист тестирования (QA)

| № | Сценарий проверки | Ожидаемый результат |
| :- | :--- | :--- |
| 1 | **Автоподстановка города (`GET /api/v1/geo`)** | Возвращает корректный город по IP пользователя; при неизвестном IP не ломает форму. |
| 2 | **Отправка валидного квиза** | Возвращает `201`, запись появляется в БД, в Telegram-чат приходит HTML-карточка за $< 3$ сек со всеми полями жителя и UTM. |
| 3 | **Ветвление услуг** | Для всех 5 кодов услуг (`chatbot`..`custom_audit`) в Telegram корректно отображаются специфичные детали ветки. |
| 4 | **HTML-инъекция в полях** | Ввод `<script>alert(1)</script> & <b>test</b>` в имя/комментарий корректно экранируется и не ломает отправку в Telegram API. |
| 5 | **Honeypot & Rate Limit** | Заполнение скрытого поля отсекает спам без отправки в бот; 4-й запрос за 10 минут с одного IP возвращает `429`. |
| 6 | **Inline-кнопки в Telegram** | Нажатие «✅ Взять в работу» обновляет статус в БД и редактирует текст сообщения в чате с указанием менеджера. |
| 7 | **Deep-link клиента** | Переход по ссылке `t.me/Bot?start=lead_...` приветствует клиента по имени и отправляет уведомление-ответ в админ-чат. |
| 8 | **Отказ Telegram API (Mock 502)** | Клиент получает `201`, лид сохраняется в БД, бот успешно доставляет заявку на 2-й попытке после восстановления сети. |