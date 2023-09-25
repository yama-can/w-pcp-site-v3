import cookie from "cookie";
import { IncomingMessage, ServerResponse } from "http";

export const getCookies = (req: IncomingMessage, res: ServerResponse) => {
	const serverCookies = req.headers.cookie || "";
	return cookie.parse(serverCookies);
};

export const setCookies = (res: ServerResponse, cookies: { [key: string]: [string, cookie.CookieSerializeOptions] }) => {
	for (const key in cookies) {
		res.setHeader('Set-Cookie', cookie.serialize(key, cookies[key][0], cookies[key][1]));
	}
};
