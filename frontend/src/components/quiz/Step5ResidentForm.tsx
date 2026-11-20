import React, { useState } from 'react';
import type { PreferredChannel } from '../../types/quiz.js';
import { Send, MapPin, MessageCircle, Phone, Smartphone, AlertCircle, Loader2 } from 'lucide-react';

interface Step5ResidentFormProps {
  primaryService: string;
  name: string;
  cityInput: string;
  cityAutofilled: boolean;
  preferredChannel: PreferredChannel;
  phone: string;
  telegramUsername: string;
  comment: string;
  consentAccepted: boolean;
  isSubmitting: boolean;
  submitError: string | null;
  onUpdate: (fields: Partial<{
    name: string;
    cityInput: string;
    preferredChannel: PreferredChannel;
    phone: string;
    telegramUsername: string;
    comment: string;
    consentAccepted: boolean;
  }>) => void;
  onSubmit: () => void;
  onOpenPrivacy: () => void;
}

export const Step5ResidentForm: React.FC<Step5ResidentFormProps> = ({
  primaryService,
  name,
  cityInput,
  cityAutofilled,
  preferredChannel,
  phone,
  telegramUsername,
  comment,
  consentAccepted,
  isSubmitting,
  submitError,
  onUpdate,
  onSubmit,
  onOpenPrivacy,
}) => {
  const [showComment, setShowComment] = useState(Boolean(comment));
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!name || name.trim().length < 2) {
      errors.name = 'Укажите ваше имя (минимум 2 символа)';
    }
    if (!cityInput || cityInput.trim().length < 2) {
      errors.cityInput = 'Укажите ваш город или район';
    }
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    if (!cleanPhone || !/^\+?[0-9]{9,15}$/.test(cleanPhone)) {
      errors.phone = 'Укажите корректный номер телефона с кодом страны';
    }
    if (preferredChannel === 'Telegram') {
      const cleanUsername = telegramUsername.replace(/^@/, '').trim();
      if (!cleanUsername || cleanUsername.length < 4) {
        errors.telegramUsername = 'Укажите ваш Telegram никнейм (например: @username)';
      }
    }
    if (!consentAccepted) {
      errors.consent = 'Необходимо подтвердить согласие на обработку данных';
    }
    return errors;
  };

  const errors = validate();

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      cityInput: true,
      phone: true,
      telegramUsername: true,
      consent: true,
    });

    if (Object.keys(errors).length === 0) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-1">
          Расчет по услуге «{primaryService || 'ИИ-услуги'}» готов!
        </h3>
        <p className="text-xs text-ink-secondary">
          Укажите контактные данные жителя (клиента) — инженер мгновенно получит спецификацию в Telegram-бот и свяжется с вами.
        </p>
      </div>

      {submitError && (
        <div className="p-3 bg-status-error/10 border border-status-error text-status-error text-xs rounded-sharp flex items-start gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}

      {/* 1. Name */}
      <div>
        <label className="block font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-1.5">
          ВАШЕ ИМЯ *
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          onBlur={() => handleBlur('name')}
          placeholder="Например: Алишер Каримов"
          className={`w-full h-11 px-3 text-base sm:text-sm bg-surface border rounded-sharp text-ink-primary focus:outline-none ${
            touched.name && errors.name
              ? 'border-status-error'
              : 'border-border-subtle focus:border-border-strong'
          }`}
          autoComplete="name"
        />
        {touched.name && errors.name && (
          <p className="text-status-error text-[11px] mt-1">{errors.name}</p>
        )}
      </div>

      {/* 2. City / District */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider">
            ГОРОД / РАЙОН ПРОЖИВАНИЯ *
          </label>
          {cityAutofilled && (
            <span className="font-mono text-[10px] text-blueprint bg-blueprint-soft px-1.5 py-0.5 rounded-sharp flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" /> Определено по IP · можно изменить
            </span>
          )}
        </div>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => onUpdate({ cityInput: e.target.value })}
          onBlur={() => handleBlur('cityInput')}
          placeholder="Например: Ташкент, Мирзо-Улугбекский р-н"
          className={`w-full h-11 px-3 text-base sm:text-sm bg-surface border rounded-sharp text-ink-primary focus:outline-none ${
            touched.cityInput && errors.cityInput
              ? 'border-status-error'
              : 'border-border-subtle focus:border-border-strong'
          }`}
          autoComplete="address-level2"
        />
        {touched.cityInput && errors.cityInput && (
          <p className="text-status-error text-[11px] mt-1">{errors.cityInput}</p>
        )}
      </div>

      {/* 3. Preferred Channel (Segmented Control) */}
      <div>
        <label className="block font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-1.5">
          УДОБНЫЙ КАНАЛ СВЯЗИ
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'Telegram', label: 'Telegram (бот)', icon: MessageCircle },
            { id: 'Phone', label: 'Телефон', icon: Phone },
            { id: 'WhatsApp', label: 'WhatsApp', icon: Smartphone },
          ].map((ch) => {
            const isSelected = preferredChannel === ch.id;
            const Icon = ch.icon;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => onUpdate({ preferredChannel: ch.id as PreferredChannel })}
                className={`py-2 px-2 border rounded-sharp text-xs font-medium flex items-center justify-center gap-1.5 transition-mechanical ${
                  isSelected
                    ? 'border-border-strong bg-ink-primary text-surface font-semibold'
                    : 'border-border-subtle bg-surface text-ink-secondary hover:border-border-strong'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{ch.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 & 5. Phone + Telegram Username */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Phone */}
        <div>
          <label className="block font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-1.5">
            НОМЕР ТЕЛЕФОНА *
          </label>
          <input
            type="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            onBlur={() => handleBlur('phone')}
            placeholder="+998 90 123-45-67"
            className={`w-full h-11 px-3 text-base sm:text-sm bg-surface border rounded-sharp text-ink-primary focus:outline-none ${
              touched.phone && errors.phone
                ? 'border-status-error'
                : 'border-border-subtle focus:border-border-strong'
            }`}
          />
          {touched.phone && errors.phone && (
            <p className="text-status-error text-[11px] mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Telegram Username */}
        <div>
          <label className="block font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider mb-1.5">
            TELEGRAM {preferredChannel === 'Telegram' ? '*' : '(ОПЦИОНАЛЬНО)'}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-3 text-ink-muted text-sm font-mono">@</span>
            <input
              type="text"
              value={telegramUsername.replace(/^@/, '')}
              onChange={(e) => onUpdate({ telegramUsername: `@${e.target.value.replace(/^@/, '')}` })}
              onBlur={() => handleBlur('telegramUsername')}
              placeholder="username"
              className={`w-full h-11 pl-7 pr-3 text-base sm:text-sm bg-surface border rounded-sharp text-ink-primary focus:outline-none ${
                touched.telegramUsername && errors.telegramUsername
                  ? 'border-status-error'
                  : 'border-border-subtle focus:border-border-strong'
              }`}
            />
          </div>
          {touched.telegramUsername && errors.telegramUsername && (
            <p className="text-status-error text-[11px] mt-1">{errors.telegramUsername}</p>
          )}
        </div>
      </div>

      {/* 6. Comment Toggle */}
      <div>
        {!showComment ? (
          <button
            type="button"
            onClick={() => setShowComment(true)}
            className="text-xs text-blueprint hover:underline font-medium"
          >
            + Добавить комментарий к задаче (необязательно)
          </button>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-mono text-xs font-semibold text-ink-primary uppercase tracking-wider">
                КОММЕНТАРИЙ К ЗАДАЧЕ
              </label>
              <span className="font-mono text-[10px] text-ink-muted">
                {comment.length} / 500
              </span>
            </div>
            <textarea
              value={comment}
              onChange={(e) => onUpdate({ comment: e.target.value.slice(0, 500) })}
              placeholder="Опишите ваши системы, объем обращений или специфику проекта..."
              rows={3}
              className="w-full p-2.5 text-base sm:text-xs bg-surface border border-border-subtle focus:border-border-strong rounded-sharp text-ink-primary focus:outline-none resize-none"
            />
          </div>
        )}
      </div>

      {/* 7. Consent Checkbox */}
      <div className="pt-2">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => onUpdate({ consentAccepted: e.target.checked })}
            className="w-4 h-4 mt-0.5 rounded-sharp border-border-subtle text-signal focus:ring-0 cursor-pointer"
          />
          <span className="text-[11px] text-ink-secondary leading-tight">
            Согласен(на) на обработку персональных данных согласно{' '}
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-blueprint underline hover:text-blueprint-hover"
            >
              Политике конфиденциальности
            </button>
          </span>
        </label>
        {touched.consent && errors.consent && (
          <p className="text-status-error text-[11px] mt-1">{errors.consent}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-signal hover:bg-signal-hover disabled:bg-border-subtle text-surface font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-sharp flex items-center justify-center gap-2 transition-mechanical shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>ОТПРАВЛЯЕМ В TELEGRAM-БОТ...</span>
            </>
          ) : (
            <>
              <span>ПОЛУЧИТЬ ПОДБОР ИИ-УСЛУГ</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};
