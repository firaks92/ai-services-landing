import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, formatPrice, type Language, type Currency } from '../i18n/translations.js';

interface LocaleContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currency: Currency;
  setCurrency: (curr: Currency) => void;
  t: (key: keyof typeof translations.ru) => string;
  formatMoney: (usdAmount: number) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ru');
  const [currency, setCurrencyState] = useState<Currency>('usd');

  useEffect(() => {
    const savedLang = localStorage.getItem('ai_site_lang') as Language;
    if (savedLang && (savedLang === 'ru' || savedLang === 'uz' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }

    const savedCurr = localStorage.getItem('ai_site_curr') as Currency;
    if (savedCurr && (savedCurr === 'usd' || savedCurr === 'uzs')) {
      setCurrencyState(savedCurr);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ai_site_lang', lang);
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('ai_site_curr', curr);
  };

  const t = (key: keyof typeof translations.ru): string => {
    const dict = translations[language] || translations.ru;
    return dict[key] || translations.ru[key] || String(key);
  };

  const formatMoney = (usdAmount: number): string => {
    return formatPrice(usdAmount, currency);
  };

  return (
    <LocaleContext.Provider
      value={{
        language,
        setLanguage,
        currency,
        setCurrency,
        t,
        formatMoney,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
