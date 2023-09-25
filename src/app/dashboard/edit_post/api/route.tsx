import getDB from "@/app/components/database";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const db = getDB();
  const author = request.nextUrl.searchParams.get("author");
  const postid = request.nextUrl.searchParams.get("post_id");
  const type = request.nextUrl.searchParams.get("type");
  if (!author || !postid || !type) {
    return new Response("", { status: 400 });
  }
  const response = await db
    .from("posts")
    .select("*")
    .filter(
      "author",
      "eq",
      (
        await db.from("users").select("id").ilike("username", author)
      ).data!![0].id
    )
    .ilike("post_id", postid)
    .filter("type", "eq", Number(type));
  return new Response(JSON.stringify(response.data), {
    status: 200,
		headers: {
			"content-type": "application/json"
		}
  });
}
