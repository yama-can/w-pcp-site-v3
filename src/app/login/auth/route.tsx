import { AuthResponse, login } from "@/app/components/auth";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const form = await request.formData();
	const response = await login(form);
	if (response == AuthResponse.Unauthorized) {
		const url = request.nextUrl.clone();
		url.pathname = "/login";
		url.searchParams.set('error', '1');
		return NextResponse.redirect(url);
	}
	if (response == AuthResponse.Stop) {
		return NextResponse.error();
	}
	return new Response("<h1>Moved Permanently</h1><p>This page is Moved Permanently to <a href='/dashboard'>/dashboard</a>.</p>", {
		status: 301,
		headers: {
			"set-cookie": serialize(...response),
			"location": "/dashboard",
			"Cache-Control": "no-cache"
		}
	});
}
