import styles from "../../simplemde-add.module.css";
import "@/app/simplemde/simplemde.min.css";
import Body from "@/app/components/body";
import Form from "@/app/components/form";
import Root from "@/app/components/root";
import Title from "@/app/components/title";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useEffect } from "react";

export default async function Base() {
  return (
    <Root>
      <Title>Create Post | Dashboard</Title>
      <Body className={styles.body}>
        <details>
          <summary>Writing Style Guide</summary>
          <ReactMarkdown>{writingStyleGuide}</ReactMarkdown>
        </details>

        <script src="/simplemde/simplemde.min.js" async></script>
        <script src="/dashboard/create_post.js" async></script>
        <Form action="/dashboard/create_post/post">
          <label htmlFor="post_id">Post ID:</label>
          <br />
          <input type="text" name="post_id" id="post_id" />
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

          <label htmlFor="type">Type: </label>
          <select name="type" id="type">
            <option value="0">Blog</option>
            <option value="1">News</option>
            <option value="2">Others</option>
          </select>

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
\`\`\`cpp
#include <iostream>
\`\`\`
`;
