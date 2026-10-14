import { useEffect, useState } from 'react';

export type Theme = 'dark' | 'light';
export const THEME_STORAGE_KEY = 'khs-lg-theme';

export function getInitialTheme(): Theme {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('theme-light')) return 'light';
  if (typeof window !== 'undefined' && window.localStorage.getItem(THEME_STORAGE_KEY) === 'light') return 'light';
  return 'dark';
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle('theme-light', theme === 'light');
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => current === 'dark' ? 'light' : 'dark');
  return { theme, toggleTheme };
}