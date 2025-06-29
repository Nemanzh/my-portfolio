import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/',
    '/(en|sr|sr-Cyrl)/:path*',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};
