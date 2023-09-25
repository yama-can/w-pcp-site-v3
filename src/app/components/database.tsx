import { createClient } from "@supabase/supabase-js";

export default function getDB() {
	return createClient(
		"https://ywqdjdcqbktemtymqiqu.supabase.co",
		process.env.db_token!!,
		{
			auth: {
				persistSession: false,
			},
		}
	);
}
