import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// Routes that don't require authentication
const authRoutes = [
  "/login",
  "/signup",
  "/forget-password",
  "/otp",
  "/create-pass",
];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname, search } = req.nextUrl;

  const isAuthRoute = authRoutes.includes(pathname);
  const isHome = pathname === "/";

  // 1) If user has a token and tries to access login/signup → redirect to home
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 2) If user is on home page without a token → redirect to login
  if (isHome && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3) If user accesses a protected page without being logged in
  if (!isAuthRoute && !token) {
    const loginUrl = new URL("/login", req.url);
    const fullPath = pathname + search;
    loginUrl.searchParams.set("callbackUrl", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
