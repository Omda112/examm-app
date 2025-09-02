import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/signup", "/forget-password", "/otp", "/create-pass"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;
  const { pathname } = url;

  const isAuthRoute = authRoutes.includes(pathname);
  const isHome = pathname === "/";
  const isPublicRoute = isHome || isAuthRoute;     // الصفحات اللي تعتبر عامة (الهوم + صفحات اللوجين/ساين اب)
  const isProtectedRoute = !isPublicRoute;         // أي حاجة غير كده تبقى محمية

  // 1) لو معاك توكن وداخل على صفحة من صفحات اللوجين/ساين اب → رجعك على الهوم
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL("/", url));
  }

  // 2) لو انت على الهوم ومفيش توكن → ودّيك على صفحة اللوجين
  if (isHome && !token) {
    return NextResponse.redirect(new URL("/login", url));
  }

  // 3) لو صفحة محمية وانت مش لوجين → ودّيك على صفحة اللوجين مع حفظ الصفحة اللي كنت رايح لها
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", url);
    // لو هو أصلاً /login ما تبعتش callbackUrl عشان ما يحصلش لوب
    if (pathname !== "/login") {
      // خد كمان أي query parameters موجودة
      const fullPath = pathname + (url.search || "");
      loginUrl.searchParams.set("callbackUrl", fullPath);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 4) غير كده → سيبه يعدي عادي
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
