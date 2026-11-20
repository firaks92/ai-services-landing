export type ServiceCode = 'chatbot' | 'automation' | 'content' | 'rag_analytics' | 'custom_audit';

export type QuizSource = 'entry_popup' | 'inline_quiz' | 'service_card' | 'exit_intent';

export type PreferredChannel = 'Telegram' | 'Phone' | 'WhatsApp';

export interface ServiceOption {
  code: ServiceCode;
  index: string;
  title: string;
  description: string;
  tags: string[];
}

export interface QuizState {
  step: number; // 1 to 5, 6 is Thank You Screen
  source: QuizSource;
  serviceCode: ServiceCode | null;
  primaryService: string;
  serviceDetails: string[];
  industry: string;
  customIndustry: string;
  timeline: string;
  budget: string;
  residentName: string;
  cityInput: string;
  cityAutofilled: boolean;
  preferredChannel: PreferredChannel;
  phone: string;
  telegramUsername: string;
  comment: string;
  consentAccepted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  leadCode?: string;
  botDeepLink?: string;
}

export interface LeadSubmissionPayload {
  quiz_source: QuizSource;
  service_focus: {
    service_code: ServiceCode;
    primary_service: string;
    service_details: string[];
    industry: string;
    timeline: string;
    budget: string;
  };
  resident_info: {
    name: string;
    city_input: string;
    preferred_channel: PreferredChannel;
    phone: string;
    telegram_username?: string | null;
    comment?: string | null;
  };
  client_meta: {
    language?: string;
    pageUrl?: string;
    referrer?: string;
    utm?: Record<string, string | null | undefined>;
  };
  consent_accepted: true;
  security: {
    honeypot: string;
    turnstile_token?: string | null;
  };
}

export interface LeadSubmissionResponse {
  success: boolean;
  lead_id: string;
  bot_deep_link: string;
}
