import { getUser } from "@/app/components/auth";
import getDB from "@/app/components/database";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const db = getDB();
  const user = await getUser({
    type: "cookie",
    value: request.headers.get("cookie"),
  });
  const form = await request.formData();
  const type = Number(form.get("type"));
  if (!(type <= 2 && 0 <= type)) {
    return new Response("無効な送信", {
      status: 400,
    });
  }

  if (
    !(form.get("post_id") as string)
      .toLowerCase()
      .match(/^([a-z]|[0-9]|\.|\-|_)*$/)
  ) {
    return new Response(
      "POST IDには英文字とハイフン、ドット、アンダーラインのみが使えます。",
      {
        status: 400,
      }
    );
  }

  const posts = await db
    .from("posts")
    .select("*")
    .ilike("post_id", (form.get("post_id") as string).toLowerCase())
    .filter("author", "eq", user!!.id);

  if (posts.error) {
    return Response.error();
  }

  if (posts.data.length != 0) {
    return new Response("Post ID already exists", { status: 400 });
  }

  const result = await db.from("posts").insert({
    post_id: (form.get("post_id") as string).toLowerCase(),
    author: user?.id,
    tags: [],
    content: form.get("content"),
    public: form.get("public") == "on",
    type: type,
  });

  if (result.error) {
    return new Response("Post ID already exists", { status: 400 });
  }

  const url = request.nextUrl;
  url.pathname = "/dashboard";
  url.searchParams.set("ok", "create_post");
  return Response.redirect(url);
}
