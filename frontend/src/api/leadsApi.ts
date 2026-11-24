import type { LeadSubmissionPayload, LeadSubmissionResponse } from '../types/quiz.js';

const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '';

export async function submitLead(payload: LeadSubmissionPayload): Promise<LeadSubmissionResponse> {
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
    // If not valid JSON (e.g. 404, 405, 502)
  }

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Вы уже отправили несколько заявок. Пожалуйста, напишите нам напрямую в Telegram.');
    }
    if (response.status === 405) {
      throw new Error('Бэкенд API временно недоступен (405). Пожалуйста, свяжитесь с нами напрямую в Telegram.');
    }
    const message = data?.errors 
      ? data.errors.map((e: any) => e.message).join('. ') 
      : data?.message || `Ошибка сервера (${response.status}). Напишите нам в Telegram.`;
    throw new Error(message);
  }

  if (!data) {
    throw new Error('Не удалось получить подтверждение от сервера. Попробуйте еще раз.');
  }

  return data as LeadSubmissionResponse;
}
