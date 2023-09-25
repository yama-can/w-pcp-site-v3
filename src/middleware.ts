import { NextRequest, NextResponse } from "next/server";
import login from "./middlewares/login";
import lower from "./middlewares/lower";

const middlewares: (
	| ((request: NextRequest) => (Promise<NextResponse<unknown> | undefined>))
	| ((request: NextRequest) => (NextResponse<unknown> | undefined))
)[] = [/*lower,*/ login];

export async function middleware(req: NextRequest) {
	for (let i = 0; i < middlewares.length; i++) {
		const result = await middlewares[i](req);
		if (result) {
			return result;
		}
	}
	return NextResponse.next();
}
