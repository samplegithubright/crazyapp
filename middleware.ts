import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token as any;

    const isAuth = !!token;
    const role = token?.role;
    const isSubscribed = token?.isSubscribed;

    const pathname = req.nextUrl.pathname;

    // =========================
    // 🔴 ADMIN PROTECTION
    // =========================
    if (
      pathname.startsWith("/admin") &&
      pathname !== "/admin/login" &&
      pathname !== "/admin/setup"
    ) {
      if (!isAuth || role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }

    // =========================
    // 🔁 REDIRECT ADMIN IF LOGGED IN
    // =========================
    if (
      (pathname === "/admin/login" || pathname === "/admin/setup") &&
      isAuth &&
      role === "admin"
    ) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    // =========================
    // 🟢 PREMIUM PROTECTION
    // =========================
    if (pathname.startsWith("/premium")) {
      if (!isAuth || !isSubscribed) {
        return NextResponse.redirect(new URL("/pricing", req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true, // let middleware handle everything
    },
  }
);

// =========================
// 🎯 MATCH ROUTES
// =========================
export const config = {
  matcher: [
    "/admin/:path*",
    "/premium/:path*",
  ],
};