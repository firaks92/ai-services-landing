import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('ai_theme_mode');
    if (saved === 'light') {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
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
      aria-label={`Переключить на ${theme === 'dark' ? 'светлую' : 'тёмную'} тему`}
      className={`relative inline-flex items-center p-1 rounded-full bg-dash-track border border-white/15 w-16 h-8 transition-colors select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-dash-cyan ${className}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center transform transition-transform duration-250 ease-out ${
          theme === 'dark'
            ? 'translate-x-8 bg-gradient-to-r from-dash-violet to-dash-purple text-dash-cyan shadow-neon-purple'
            : 'translate-x-0 bg-white text-dash-magenta shadow-md'
        }`}
      >
        {theme === 'dark' ? (
          <Moon className="w-3.5 h-3.5 fill-current" />
        ) : (
          <Sun className="w-3.5 h-3.5 fill-current" />
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2 text-[10px] font-mono pointer-events-none opacity-50">
        <span className={theme === 'dark' ? 'text-dash-muted' : 'opacity-0'}>☀</span>
        <span className={theme === 'light' ? 'text-dash-muted' : 'opacity-0'}>☾</span>
      </div>
    </button>
  );
};
