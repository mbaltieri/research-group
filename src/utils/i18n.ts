// src/utils/i18n.ts
import { getRelativeLocaleUrl } from 'astro:i18n';
import { LOCALES, DEFAULT_LOCALE } from '~/i18n.config.ts';

// Helpful getters
export const locales = () => [...LOCALES];
export const defaultLocale = () => DEFAULT_LOCALE;

/**
 * Return the current locale from an .astro file’s context.
 * (Call as: `currentLocale(Astro.currentLocale)`)
 */
export function currentLocale(curr: string | undefined) {
  return curr ?? DEFAULT_LOCALE;
}

/**
 * Build a localized URL for the current page, keeping path & query.
 * Works with prefixDefaultLocale on/off.
 */
export function localizedUrl(targetLocale: string, url: URL) {
  // strip leading locale segment if present
  const parts = url.pathname.split('/').filter(Boolean);
  let path = url.pathname;
  if (LOCALES.includes(parts[0] as any)) {
    path = '/' + parts.slice(1).join('/');
  }
  // normalize to "relative path" for the API (no leading slash)
  const rel = path.replace(/^\/+/, '');

  const localizedPath = getRelativeLocaleUrl(targetLocale, rel);
  return localizedPath + (url.search || '');
}

// return the tag you want to expose to search engines
export function hreflang(locale: string): string {
  return locale; // or map here: if (locale==='en') return 'en-JP'
}
