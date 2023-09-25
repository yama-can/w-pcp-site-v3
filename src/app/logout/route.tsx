import { serialize } from "cookie";
import { parseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const url = request.nextUrl.clone();
	url.pathname = "/";
	return new NextResponse("", {
		status: 301,
		headers: {
			location: "/",
			"Cache-Control": "no-cache",
			"set-cookie": serialize("_CT", "", { expires: new Date(0) }),
		},
	});
}
