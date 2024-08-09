import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // const currentUser = request.cookies.get("currentUser")?.value;
  // if (false) {
  //   return Response.redirect(new URL("/admin", request.url));
  // }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/dashboard/:path*",
};
