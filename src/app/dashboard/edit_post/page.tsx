import styles from "../../simplemde-add.module.css";
import "@/app/simplemde/simplemde.min.css";
import Body from "@/app/components/body";
import Form from "@/app/components/form";
import Root from "@/app/components/root";
import Title from "@/app/components/title";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useEffect } from "react";
import { getUser } from "@/app/components/auth";
import { headers } from "next/headers";
import { Permission, isContainPermission } from "@/app/components/permissions";

export default async function Base({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const user = await getUser({
    type: "cookie",
    value: headers().get("cookie"),
  });
  return (
    <Root>
      <Title>Edit Post | Dashboard</Title>
      <Body className={styles.body}>
        <details>
          <summary>Writing Style Guide</summary>
          <ReactMarkdown>{writingStyleGuide}</ReactMarkdown>
        </details>

        <script src="/simplemde/simplemde.min.js" async></script>
        <script src="/dashboard/edit_post.js" async></script>
				<p>Loadボタンでポストをロードできます。</p>
        <Form action="/dashboard/edit_post/post">
          <br />

          <label htmlFor="user_id">User ID:</label>
          <br />
          <input
            type="text"
            name="user_id"
            id="user_id"
            defaultValue={searchParams.user_id || user?.username}
            disabled={
              !isContainPermission(user!!.permission, Permission.manager)
            }
          />

          <label htmlFor="post_id">Post ID:</label>
          <br />
          <input
            type="text"
            name="post_id"
            id="post_id"
            defaultValue={searchParams.post_id || ""}
          />

          <label htmlFor="type">Type: </label>
          <select name="type" id="type" defaultValue={searchParams.type || "0"}>
            <option value="0">Blog</option>
            <option value="1">News</option>
            <option value="2">Others</option>
          </select>

          <button id="load" type="button">
            Load
          </button>
          <label>Content:</label>
          <iframe
            id="mde"
            src="/iframe/mde"
            style={{ width: "100%", height: "500px" }}
          />
          <label htmlFor="public">Public: </label>
          <input
            type="checkbox"
            name="public"
            id="public"
            defaultChecked={true}
          />

          <br />

          <button id="submit-button" type="button">
            Submit
          </button>
          <textarea name="content" id="content" hidden></textarea>
          <input type="submit" id="submit" hidden />
        </Form>
      </Body>
    </Root>
  );
}

const writingStyleGuide = `
# Writing Style Guide
## 名前規定
H1要素は\`# \`で始まる行のことを言います。
H2要素は\`## \`で始まる行のことを言います。
H3要素は\`### \`で始まる行のことを言います。
H4,H5,H6まで同じように存在します。
## タイトル規定
H1要素（\`# \`）で始まる要素はタイトルとして認識されます。文章内の先頭に1つだけ存在する必要があります。
## 見出し規定
H1以外のHx要素は必ずH1,…,Hx-1が前にある必要があります。
## リンク規定
リンクは\`[リンクテキスト](リンク先URL)\`の形式で書きます。
## 強調規定
強調は\`*強調テキスト*\`の形式で書きます。
## リスト規定
リストは\`- リスト要素\`の形式で書きます。
## 引用規定
引用は\`> 引用要素\`の形式で書きます。
## コード規定
コードは、
\\\`\\\`\\\`cpp
#include <iostream>
\\\`\\\`\\\`
のように書きます。
`;
