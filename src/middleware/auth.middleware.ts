import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { i18n } from "../../i18n.config";

const middlewarePath = ["/admin"];

export const withAuth = (next: any) => {
  return async (request: NextRequest, _next: NextFetchEvent) => {
    const pathname = getPathWithoutLocale(request.nextUrl.pathname);

    if (pathname === "/login") {
      const cookie = request.cookies.get("Authorization");
      if (!cookie) return next(request, _next);
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/cookie/verify`,
          {
            credentials: "include",
            headers: {
              cookie: Object.values(cookie).join("="),
            },
          }
        );
        if (res.status === 200) {
          return NextResponse.redirect(new URL("/admin", request.url));
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (middlewarePath?.some(path => pathname.startsWith(path))) {
      const cookie = request.cookies.get("Authorization");
      if (!cookie) return NextResponse.redirect(new URL("/login", request.url));
      try {
        const res = await fetch(
          `${process.env.BACKEND_URL}/api/v1/cookie/verify`,
          {
            credentials: "include",
            headers: {
              cookie: Object.values(cookie).join("="),
            },
          }
        );
        if (res.status !== 200) {
          return NextResponse.redirect(new URL("/login", request.url));
        }
        return NextResponse.next();
      } catch (err) {
        console.error(err);
      }
    }
    return next(request, _next);
  };
};

const getPathWithoutLocale = (path: string): string => {
  for (const locale of i18n.locales) {
    if (path.startsWith(`/${locale}`)) {
      return path.slice(locale.length + 1);
    }
  }
  return path;
};
