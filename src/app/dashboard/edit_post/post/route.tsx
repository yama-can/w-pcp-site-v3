import { getUser } from "@/app/components/auth";
import getDB from "@/app/components/database";
import { NextRequest } from "next/server";
import { Permission, isContainPermission } from "@/app/components/permissions";

export async function POST(request: NextRequest) {
  const db = getDB();
  const user = await getUser({
    type: "cookie",
    value: request.headers.get("cookie"),
  });
  const form = await request.formData();

  if (!user) {
    return new Response("", { status: 400 });
  }

  if (
    form.get("user_id")?.toString().toLowerCase() !=
      user?.username.toLowerCase() &&
    !isContainPermission(user?.permission, Permission.manager)
  ) {
    return new Response("", { status: 403 });
  }

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
    .filter(
      "author",
      "eq",
      (await getUser({
        type: "username",
        value: form.get("user_id") as string,
      }))!!.id
    );

  if (posts.error) {
    console.error(posts.error);
    throw "err";
  }

  if (posts.data.length == 0) {
    return new Response("Post ID doesn't exist yet", { status: 400 });
  }

  const result = await db
    .from("posts")
    .update({
      content: form.get("content"),
      public: form.get("public") == "on",
      last_update: new Date(),
    })
    .ilike("post_id", (form.get("post_id") as string).toLowerCase())
    .filter(
      "author",
      "eq",
      (await getUser({
        type: "username",
        value: form.get("user_id") as string,
      }))!!.id
    );

  if (result.error) {
    return new Response("Error", { status: 400 });
  }

  const url = request.nextUrl;
  url.pathname = "/dashboard";
  url.searchParams.set("ok", "edit_post");
  return Response.redirect(url, 301);
}
