import {NextFetchEvent, NextRequest} from 'next/server'
import {NextResponse} from 'next/server'

import {match} from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import {i18n} from "../../i18n.config";

function getLocale(request: NextRequest): string {
  const i18nCookie = request.cookies.get("i18n_locale")
  if (i18nCookie) {
    return i18nCookie.value
  } else {
    const negotiatorHeaders: Record<string, string> = {}
    request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

    // @ts-ignore locales are readonly
    const locales: string[] = i18n.locales
    const languages: string[] = new Negotiator({headers: negotiatorHeaders}).languages()
    return match(languages, locales, i18n.defaultLocale)
  }
}

export const withLocale = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = request.nextUrl.pathname;
    const pathnameIsMissingLocale = i18n.locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(request)
      const url = new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
      const response = NextResponse.redirect(url)
      response.cookies.set({
        name: 'i18n_locale',
        value: locale,
        path: '/',
      })
      return response
    }

    return next(request, _next);
  }
}