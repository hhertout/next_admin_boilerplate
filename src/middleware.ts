import {stackMiddlewares} from "@/middleware/stackMiddleware";
import {withAuth} from "@/middleware/auth.middleware";
import {withLocale} from "@/middleware/locale.middleware";


const middlewares = [withLocale, withAuth];
export default stackMiddlewares(middlewares);

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
