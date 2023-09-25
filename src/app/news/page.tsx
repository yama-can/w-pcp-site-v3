import { headers } from "next/headers";
import { getUser } from "../components/auth";
import Card from "../components/card";
import Cards from "../components/cards";
import Header from "../components/header";
import LoginMenu from "../components/login-menu";
import Root from "../components/root";
import Title from "../components/title";
import {
  Permission,
  containPermissions,
  isContainPermission,
} from "../components/permissions";
import Body from "../components/body";
import getDB from "../components/database";
import { NextResponse } from "next/server";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const db = getDB();
  const user = (await getUser({
    type: "cookie",
    value: headers().get("cookie"),
  }))!!;
  const users = await db.from("users").select("*");

  let pubFunc = (e: PostgrestFilterBuilder<any, any, any[], unknown>) =>
    e.filter("public", "eq", true);
  if (user && isContainPermission(user.permission, Permission.poster)) {
    pubFunc = (e) => e;
  }

  const data = await pubFunc(
    db.from("posts").select("*").filter("type", "eq", 1)
  )
    .range(
      20 * (Number(searchParams.page) || 0),
      20 * (Number(searchParams.page) || 0) + 20
    )
    .order("created_at", { ascending: false });

  if (data.error || users.error) {
    return (
      <Root>
        <Title>News</Title>
        <p>読み込みに失敗しました。再読み込みしてください。</p>
      </Root>
    );
  }

  let elements: any[] = [];
  data.data.forEach((post) => {
    const username = users.data.find(
      (user) => user.id == post.author
    )?.username;
    elements.push(
      <Card href={`/news/${username}/${post.post_id}`}>
        {{
          title:
            (user && isContainPermission(user.permission, Permission.manager)
              ? post.public
                ? "🔓"
                : "🔒"
              : "") +
              (post.content as string)
                .split("\n")
                .find((line) => line.startsWith("# "))
                ?.slice(2)
                .replace(/[\s|\t]*$/, "") || post.post_id,
          description:
            (post.content.length > 40
              ? (post.content as string).slice(0, 40) + "…"
              : post.content) +
            " " +
            new Date(post.created_at).toLocaleDateString("ja"),
          editor: username,
          editorUrl: `/news/${username}`,
        }}
      </Card>
    );
  });

  return (
    <Root>
      <Title>News</Title>

      <p>興風祭などの予定などを公開するニュースページです。</p>
      <Body>
        <Cards>
          {user && isContainPermission(user.permission, Permission.poster) ? (
            <Card href="/dashboard/create_post">
              {{ title: "投稿を作成", description: "新しく投稿を作成します。" }}
            </Card>
          ) : (
            <></>
          )}
          {elements}
        </Cards>
      </Body>
    </Root>
  );
}
