import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const isAuth = !!req.nextauth.token;
    const role = (req.nextauth.token as any)?.role;
    const pathname = req.nextUrl.pathname;

    // Protect all /admin routes except /admin/setup and /admin/login
    if (pathname.startsWith("/admin") && pathname !== "/admin/setup" && pathname !== "/admin/login") {
      if (!isAuth || role !== "admin") {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
    }
    
    // Redirect authenticated admins away from login/setup pages
    if ((pathname === "/admin/login" || pathname === "/admin/setup") && isAuth && role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  },
  {
    callbacks: {
      authorized: () => true, // Let the middleware function handle all routing logic
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
