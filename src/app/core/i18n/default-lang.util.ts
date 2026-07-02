import { translocoConfig } from './transloco.config';

export function resolveDefaultLang(): string {
  const fallbackLang = translocoConfig.defaultLang;
  const availableLangs = translocoConfig.availableLangs;

  if (typeof localStorage === 'undefined') {
    return fallbackLang;
  }

  const savedLang = localStorage.getItem('lang');
  return savedLang && availableLangs.includes(savedLang) ? savedLang : fallbackLang;
}