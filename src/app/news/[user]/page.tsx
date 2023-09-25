import { headers } from "next/headers";
import { getUser } from "../../components/auth";
import Card from "../../components/card";
import Cards from "../../components/cards";
import Root from "../../components/root";
import Title from "../../components/title";
import Body from "../../components/body";
import getDB from "../../components/database";
import { notFound } from "next/navigation";
import { Permission, isContainPermission } from "@/app/components/permissions";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { NextURL } from "next/dist/server/web/next-url";

export default async function Home({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string };
  params: { [key: string]: string };
}) {
  if (params.user.toLowerCase() != params.user) {
    return new Response("", {
      status: 301,
      headers: {
        location: `/news/${params.user.toLowerCase()}`,
      },
    });
  }
  const db = getDB();
  const user = (await getUser({
    type: "cookie",
    value: headers().get("cookie"),
  }))!!;
  const users = await db.from("users").select("*");

  if (users.error) {
    return (
      <Root>
        <Title>{`${params.user}の投稿一覧 | Blog`}</Title>
        <p>読み込みに失敗しました。再読み込みしてください。</p>
      </Root>
    );
  }

  if (!users.data.find((col) => col.username == params.user)) {
    notFound();
  }

  let pubFunc = (e: PostgrestFilterBuilder<any, any, any[], unknown>) =>
    e.filter("public", "eq", true);
  if (user && isContainPermission(user.permission, Permission.poster)) {
    pubFunc = (e) => e;
  }

  const data = await pubFunc(
    db
      .from("posts")
      .select("*")
      .filter(
        "author",
        "eq",
        users.data.find((col) => col.username == params.user).id
      )
      .filter("type", "eq", 1)
  )
    .range(
      20 * (Number(searchParams.page) || 0),
      20 * (Number(searchParams.page) || 0) + 20
    )
    .order("created_at", { ascending: false });

  if (data.error) {
    return (
      <Root>
        <Title>{`${params.user}の投稿一覧 | News`}</Title>
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
            (user && isContainPermission(user.permission, Permission.poster)
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
      <Title>{`${params.user}の投稿一覧 | News`}</Title>

      <p>興風祭などの予定などを公開するニュースページです。</p>
      <Body>
        <Cards>
          {elements}
          <Card href="/news">
            {{
              title: "トップへ戻る",
              description: "投稿一覧に戻る",
            }}
          </Card>
        </Cards>
      </Body>
    </Root>
  );
}
