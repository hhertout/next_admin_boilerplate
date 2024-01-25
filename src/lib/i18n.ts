import 'server-only'
import {Locale} from "../../i18n.config";

const dictionaries = {
  en: async () => await import('@/i18n/en.json').then(module => module.default),
  fr: async () => await import('@/i18n/fr.json').then(module => module.default)
}

export const getLocale = async (locale: Locale) => await dictionaries[locale]()