import { IncomingMessage, ServerResponse } from "http";
import { createClient } from '@supabase/supabase-js'
import { config as dotenv } from "dotenv";
import crypto, { randomUUID } from "crypto";
import querystring from "querystring";
import { setCookies } from "./cookies";
import cookie, { CookieParseOptions, CookieSerializeOptions } from "cookie";

export enum AuthResponse {
	Ok = 0,
	Unauthorized = 1,
	Stop = 2
}

const getDB = () => {
	return createClient("https://ywqdjdcqbktemtymqiqu.supabase.co", process.env.db_token!!, {
		auth: {
			persistSession: false
		}
	});
}

export const login = (async (body: FormData) => {
	const db = getDB();
	const hashedPassword = crypto.createHash('sha256').update(body.get('password') as string).digest('hex');
	const table = await (db.from("users").select("*").eq('username', body.get('username')).eq('password', hashedPassword));
	if (!table.data || table.error) {
		return AuthResponse.Stop;
	}
	const user = table.data[0];
	if (user) {
		const token = randomUUID();
		await (db.from('login_tokens').insert({ token, user: user.id, created_at: (new Date()).toISOString() }));
		return ['_CT', token, { maxAge: 60 * 60 * 24 * 30, path: '/', httpOnly: true }] as ['_CT', `${string}-${string}-${string}-${string}-${string}`, CookieSerializeOptions];
	}
	return AuthResponse.Unauthorized;
});

export const logout = (async (req: IncomingMessage, res: ServerResponse) => {
	setCookies(res, { '_CT': ["", { maxAge: 0, path: '/', httpOnly: true }] });
});

export interface UserInfo {
	username: string;
	id: string;
	permission: number;
	password: string;
	created_at: number;
	tfa: boolean;
	token_created_at?: number;
}

import { cookies } from "next/headers";
import nodeCache from "node-cache";

type req = IncomingMessage | null | { type: "cookie", value: string | null | undefined } | { type: "username", value: string | null | undefined };

export const getUser = (async (req?: req): Promise<undefined | UserInfo> => {
	const db = getDB();
	let ct: string | undefined = "";
	if (typeof req === "string") {
		ct = cookie.parse(req)._CT;
	} else if (req == null) {
		return undefined;
	} else if (req == undefined) {
		ct = cookies().get('_CT')?.value;
		if (!ct) return undefined;
	} else if ("type" in req && req.type == "cookie") {
		if (!req.value) return undefined;
		const cookies = cookie.parse(req.value);
		ct = cookies._CT;
	} else if ("type" in req && req.type == "username") {
		if (!req.value) return undefined;
		const user = (await db.from('users').select('*').ilike('username', req.value)).data!![0];
		return { username: user.username, id: user.id, permission: user.permission, password: user.password, tfa: user['2fa'], created_at: new Date(user.created_at).getTime() };
	} else {
		if (!req.headers.cookie) {
			return undefined;
		}
		const cookies = cookie.parse(req.headers.cookie);
		ct = cookies._CT;
	}
	await db.from('login_tokens').delete().lt('created_at', new Date((new Date()).getTime() - 60 * 60 * 24 * 1000).toDateString());
	const token = (await db.from('login_tokens').select('*').eq('token', ct)).data?.[0];
	if (!token) {
		return undefined;
	}
	const user = (await db.from('users').select('*').eq('id', token.user)).data!![0];
	if (!user) {
		return undefined;
	}
	return { username: user.username, id: user.id, permission: user.permission, password: user.password, tfa: user['2fa'], created_at: new Date(user.created_at).getTime(), token_created_at: new Date(token.created_at).getTime() };
});
