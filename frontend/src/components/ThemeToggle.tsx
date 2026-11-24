import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('ai_theme_mode');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    localStorage.setItem('ai_theme_mode', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
      className={`relative inline-flex items-center p-1 rounded-full clay-inset w-16 h-8 transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-clay-emerald ${className}`}
    >
      <div
        className={`w-6 h-6 rounded-full clay-knob flex items-center justify-center transform transition-transform duration-250 ease-out ${
          theme === 'dark' ? 'translate-x-8 bg-clay-pine text-clay-mint' : 'translate-x-0 bg-white text-clay-coral'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-current" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-mono pointer-events-none opacity-60">
        <span className={theme === 'light' ? 'opacity-0' : 'text-clay-sage'}>☀</span>
        <span className={theme === 'dark' ? 'opacity-0' : 'text-clay-pine'}>☾</span>
      </div>
    </button>
  );
};
