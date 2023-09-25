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

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const user = (await getUser({
    type: "cookie",
    value: headers().get("cookie"),
  }))!!;
  return (
    <Root>
      <Title>Dashboard</Title>

      {searchParams.ok ? (
        <div>
          <p>
            ✅ 投稿の
            {searchParams.ok == "create_post"
              ? "作成"
              : searchParams.ok == "delete_post"
              ? "削除"
              : searchParams.ok == "edit_post"
              ? "編集"
              : "処理"}
            に成功しました。
          </p>
        </div>
      ) : (
        <></>
      )}

      <Body>
        <Cards>
          {isContainPermission(user.permission, Permission.poster) ? (
            <>
              <Card href="/img/yama.can/policies">
                {{ title: "Check Policies", description: "ポリシーを確認" }}
              </Card>
              <Card href="/dashboard/create_post">
                {{ title: "Create New Post", description: "新しい投稿を作成" }}
              </Card>
              <Card href="/dashboard/edit_post">
                {{ title: "Edit a Post", description: "投稿を編集" }}
              </Card>
              <Card href="/dashboard/delete_post">
                {{ title: "Delete a Post", description: "投稿を削除" }}
              </Card>
              <Card href="/dashboard/evaluations">
                {{
                  title: "Check Evaluations",
                  description: "投稿の評価を確認",
                }}
              </Card>
            </>
          ) : (
            <></>
          )}
          {isContainPermission(user.permission, Permission.user_admin) ? (
            <Card href="/dashboard/management_user">
              {{ title: "Management User", description: "ユーザーを管理" }}
            </Card>
          ) : (
            <></>
          )}
          <Card href="/">
            {{ title: "Back to Top", description: "トップページに戻る" }}
          </Card>
          <Card href="/blog">
            {{ title: "Watch Blog", description: "ブログを閲覧" }}
          </Card>
          <Card href="/news">
            {{ title: "Watch News", description: "ニュースを閲覧" }}
          </Card>
        </Cards>
      </Body>
    </Root>
  );
}
