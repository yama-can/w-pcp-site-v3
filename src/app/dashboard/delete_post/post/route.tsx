import { getUser } from "@/app/components/auth";
import getDB from "@/app/components/database";
import {
  Permission,
  containPermissions,
  isContainPermission,
} from "@/app/components/permissions";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const form = await request.formData();
  const user = await getUser({
    type: "cookie",
    value: request.headers.get("cookie"),
  });
  if (!user) {
    notFound();
  }
  if (!form.has("type")) {
    return new Response("", {
      status: 400,
    });
  }
  const post_id = form.get("post_id") as string;
  const db = getDB();
  if (isContainPermission(user.permission, Permission.manager)) {
    await db
      .from("posts")
      .delete()
      .filter(
        "author",
        "eq",
        (await getUser({
          type: "username",
          value: form.get("user_id") as string,
        }))!!.id
      )
      .filter("type", "eq", Number(form.get("type")))
      .ilike("post_id", post_id);
  }
  if (isContainPermission(user.permission, Permission.poster)) {
    await db
      .from("posts")
      .delete()
      .filter("author", "eq", user.id)
      .ilike("post_id", post_id);
  }
  return new Response("", {
    status: 301,
    headers: {
      Location: "/dashboard?ok=delete_post",
    },
  });
}
