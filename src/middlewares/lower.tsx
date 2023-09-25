import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.toLowerCase() != request.nextUrl.pathname) {
    return new NextResponse("", {
      status: 301,
      headers: {
        Location: request.nextUrl.pathname.toLowerCase(),
      },
    });
  }
  return undefined;
}
