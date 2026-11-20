import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  FRONTEND_ORIGIN: z.string().default('http://localhost:5173'),
  TRUST_PROXY: z
    .string()
    .transform((val) => val === 'true' || val === '1')
    .default('true'),

  DATABASE_URL: z.string().default('file:./dev.db'),

  TELEGRAM_BOT_TOKEN: z.string().default('123456789:ABCdefGHIjklMNOpqrsTUVwxyz'),
  TELEGRAM_BOT_USERNAME: z.string().default('YourAiServicesBot'),
  TELEGRAM_ADMIN_CHAT_ID: z.string().default('-1001234567890'),
  TELEGRAM_TOPIC_ID: z.string().optional(),
  TELEGRAM_WEBHOOK_URL: z.string().optional(),
  TELEGRAM_WEBHOOK_SECRET: z.string().default('default_webhook_secret'),

  TURNSTILE_SECRET_KEY: z.string().optional(),
  TURNSTILE_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .default('false'),

  GEOIP_DB_PATH: z.string().default('./data/GeoLite2-City.mmdb'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
