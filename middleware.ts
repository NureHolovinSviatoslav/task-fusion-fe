import { NextResponse, NextRequest } from 'next/server';
import { UserType } from './types/enums';
import { refreshTokens } from './utils/api/mutations';
import { DEFAULT_AGE } from './utils/constants';
import { getCookies, isAccessTokenValid } from './utils/serverActions';

const LOGGED_IN_ONLY_ROUTES = ['/profile/', '/dashboard', '/projects/'];
const LOGGED_OUT_ONLY_ROUTES = ['/auth/login', '/auth/signup'];
const CLIENT_ONLY_ROUTES = ['/projects/create', '/client/.*'];
const DEVELOPER_ONLY_ROUTES = ['/developer/.*'];
const PM_ONLY_ROUTES = ['/pm/.*'];

const matchesRoute = (url: string, routes: string[]) => routes.some((route) => new RegExp(`^${route}(.*)?$`).test(url));

function decodeJWT(token: string) {
  if (!token) {
    return null;
  }

  const parts = token.split('.');

  if (parts.length !== 3) return null;

  try {
    return JSON.parse(Buffer.from(parts[1], 'base64').toString('utf-8'));
  } catch {
    return null;
  }
}

function redirectToLogin(request: NextRequest) {
  const redirectResponse = NextResponse.redirect(new URL('/auth/login', request.url));

  redirectResponse.cookies.delete('access_token');
  redirectResponse.cookies.delete('refresh_token');

  return redirectResponse;
}

function redirectToDashboard(request: NextRequest) {
  return NextResponse.redirect(new URL('/dashboard', request.url));
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();

  response.headers.set('x-pathname', pathname);

  let isLoggedIn = false;
  let accessTokenPayload = null;

  if (!matchesRoute(pathname, LOGGED_OUT_ONLY_ROUTES)) {
    let accessToken = (await getCookies('access_token')) || '';
    const refreshToken = await getCookies('refresh_token');

    let isAccessTokenValidFlag = await isAccessTokenValid(accessToken);

    if (!isAccessTokenValidFlag && refreshToken) {
      const { data } = await refreshTokens(refreshToken);

      if (data) {
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data;

        response.cookies.set('access_token', newAccessToken, {
          maxAge: DEFAULT_AGE,
          httpOnly: true,
          sameSite: 'strict',
        });

        response.cookies.set('refresh_token', newRefreshToken, {
          maxAge: DEFAULT_AGE,
          httpOnly: true,
          sameSite: 'strict',
        });

        accessToken = newAccessToken;
        isAccessTokenValidFlag = true;
        isLoggedIn = true;
        accessTokenPayload = decodeJWT(newAccessToken);
      } else {
        return redirectToLogin(request);
      }
    } else if (!isAccessTokenValidFlag) {
      return redirectToLogin(request);
    } else {
      isLoggedIn = true;
      accessTokenPayload = decodeJWT(accessToken);
    }
  }

  response.headers.set('x-logged-in', String(isLoggedIn));

  if (pathname === '/') {
    if (isLoggedIn) {
      return redirectToDashboard(request);
    }
    return redirectToLogin(request);
  }

  if (matchesRoute(pathname, LOGGED_IN_ONLY_ROUTES) && !isLoggedIn) {
    return redirectToLogin(request);
  }

  if (matchesRoute(pathname, LOGGED_OUT_ONLY_ROUTES) && isLoggedIn) {
    return redirectToDashboard(request);
  }

  if (matchesRoute(pathname, CLIENT_ONLY_ROUTES)) {
    if (!isLoggedIn || accessTokenPayload?.userType !== UserType.CLIENT) {
      return redirectToLogin(request);
    }
  }

  if (matchesRoute(pathname, DEVELOPER_ONLY_ROUTES)) {
    if (!isLoggedIn || accessTokenPayload?.userType !== UserType.DEVELOPER) {
      return redirectToLogin(request);
    }
  }

  if (matchesRoute(pathname, PM_ONLY_ROUTES)) {
    if (!isLoggedIn || accessTokenPayload?.userType !== UserType.PM) {
      return redirectToLogin(request);
    }
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
