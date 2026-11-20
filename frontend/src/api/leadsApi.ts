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

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('Вы уже отправили несколько заявок. Пожалуйста, напишите нам напрямую в Telegram.');
    }
    const message = data.errors ? data.errors.map((e: any) => e.message).join('. ') : data.message || 'Ошибка отправки заявки';
    throw new Error(message);
  }

  return data as LeadSubmissionResponse;
}
