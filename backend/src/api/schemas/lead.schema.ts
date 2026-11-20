import { z } from 'zod';

export const leadSubmissionSchema = z
  .object({
    quiz_source: z.enum(['entry_popup', 'inline_quiz', 'service_card', 'exit_intent']).default('entry_popup'),
    service_focus: z.object({
      service_code: z.enum(['chatbot', 'automation', 'content', 'rag_analytics', 'custom_audit']),
      primary_service: z.string().min(2),
      service_details: z.array(z.string()).min(1).max(10),
      industry: z.string().min(2),
      timeline: z.string().min(2),
      budget: z.string().min(2),
    }),
    resident_info: z.object({
      name: z.string().trim().min(2, 'Имя должно содержать минимум 2 символа').max(100),
      city_input: z.string().trim().min(2, 'Укажите город или район').max(150),
      preferred_channel: z.enum(['Telegram', 'Phone', 'WhatsApp']),
      phone: z
        .string()
        .transform((val) => val.replace(/[\s\-\(\)]/g, ''))
        .refine((val) => /^\+?[0-9]{9,15}$/.test(val), {
          message: 'Некорректный номер телефона (ожидается от 9 до 15 цифр)',
        }),
      telegram_username: z
        .string()
        .trim()
        .optional()
        .nullable()
        .transform((val) => {
          if (!val) return null;
          return val.startsWith('@') ? val : `@${val}`;
        }),
      comment: z.string().max(500, 'Комментарий не может превышать 500 символов').optional().nullable(),
    }),
    client_meta: z
      .object({
        language: z.string().optional().nullable(),
        page_url: z.string().optional().nullable(),
        pageUrl: z.string().optional().nullable(),
        referrer: z.string().optional().nullable(),
        utm: z
          .object({
            source: z.string().optional().nullable(),
            medium: z.string().optional().nullable(),
            campaign: z.string().optional().nullable(),
            term: z.string().optional().nullable(),
            content: z.string().optional().nullable(),
          })
          .optional()
          .nullable(),
      })
      .optional()
      .default({}),
    consent_accepted: z.literal(true, {
      errorMap: () => ({ message: 'Необходимо подтвердить согласие на обработку персональных данных' }),
    }),
    security: z
      .object({
        honeypot: z.string().max(0, 'Bot detected').optional().default(''),
        turnstile_token: z.string().optional().nullable(),
      })
      .optional()
      .default({ honeypot: '' }),
  })
  .refine(
    (data) => {
      if (data.resident_info.preferred_channel === 'Telegram') {
        const username = data.resident_info.telegram_username;
        if (!username || !/^@[a-zA-Z0-9_]{4,32}$/.test(username)) {
          return false;
        }
      }
      return true;
    },
    {
      message: 'Для связи через Telegram укажите никнейм (@username)',
      path: ['resident_info', 'telegram_username'],
    }
  );

export type LeadSubmissionInput = z.infer<typeof leadSubmissionSchema>;
