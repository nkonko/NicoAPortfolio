import { isDevMode } from '@angular/core';

export const translocoConfig = {
  availableLangs: ['en', 'es'],
  defaultLang: 'en',
  fallbackLang: 'en',
  reRenderOnLangChange: true,
  prodMode: !isDevMode(),
};
