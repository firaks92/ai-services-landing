export interface UtmData {
  source?: string | null;
  medium?: string | null;
  campaign?: string | null;
  term?: string | null;
  content?: string | null;
  referrer?: string | null;
  pageUrl?: string | null;
}

const STORAGE_KEY = 'ai_quiz_utm';

export function captureUtm(): UtmData {
  if (typeof window === 'undefined') return {};

  try {
    const existing = sessionStorage.getItem(STORAGE_KEY);
    if (existing) {
      return JSON.parse(existing);
    }

    const params = new URLSearchParams(window.location.search);
    const utm: UtmData = {
      source: params.get('utm_source') || null,
      medium: params.get('utm_medium') || null,
      campaign: params.get('utm_campaign') || null,
      term: params.get('utm_term') || null,
      content: params.get('utm_content') || null,
      referrer: document.referrer || null,
      pageUrl: window.location.href,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(utm));
    return utm;
  } catch {
    return {};
  }
}

export function getStoredUtm(): UtmData {
  if (typeof window === 'undefined') return {};
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : captureUtm();
  } catch {
    return {};
  }
}
