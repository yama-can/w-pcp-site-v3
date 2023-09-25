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
        location: `/blog/${params.user.toLowerCase()}`,
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
      .filter("type", "eq", 0)
  )
    .range(
      20 * (Number(searchParams.page) || 0),
      20 * (Number(searchParams.page) || 0) + 20
    )
    .order("created_at", { ascending: false });

  if (data.error) {
    return (
      <Root>
        <Title>{`${params.user}の投稿一覧 | Blog`}</Title>
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
      <Card href={`/blog/${username}/${post.post_id}`}>
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
          editorUrl: `/blog/${username}`,
        }}
      </Card>
    );
  });

  return (
    <Root>
      <Title>{`${params.user}の投稿一覧 | Blog`}</Title>

      <p>
        部員みんなで作ったブログです。パソコンや早稲田の日常など様々なことを紹介しています！
      </p>
      <Body>
        <Cards>
          {elements}
          <Card href="/blog">
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
