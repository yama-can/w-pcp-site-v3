import styles from "../../simplemde-add.module.css";
import "@/app/simplemde/simplemde.min.css";
import Body from "@/app/components/body";
import Form from "@/app/components/form";
import Root from "@/app/components/root";
import Title from "@/app/components/title";
import ReactMarkdown from "react-markdown";
import Head from "next/head";
import { useEffect } from "react";
import { UserInfo, getUser } from "@/app/components/auth";
import { headers } from "next/headers";
import { Permission, isContainPermission } from "@/app/components/permissions";

export default async function Base({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const user = (await getUser({
    type: "cookie",
    value: headers().get("cookie"),
  })) as UserInfo;
  return (
    <Root>
      <Title>Delete Post | Dashboard</Title>
      <Body className={styles.body}>
        <Form action="/dashboard/delete_post/post">
          <label htmlFor="user_id">User ID:</label>
          <br />
          <input
            type="text"
            name="user_id"
            id="user_id"
            defaultValue={
              isContainPermission(user.permission, Permission.manager)
                ? searchParams.user_id || user.username
                : user.username
            }
            disabled={!isContainPermission(user.permission, Permission.manager)}
            required
          />
          <br />
          <label htmlFor="post_id">Post ID:</label>
          <br />
          <input
            type="text"
            name="post_id"
            id="post_id"
            defaultValue={searchParams.post_id}
            required
          />
          <br />
					<label htmlFor="type">Type:</label>
          <select name="type" id="type" defaultValue={searchParams.type || "0"} required>
						<option value="0">Blog</option>
						<option value="1">News</option>
						<option value="2">Others</option>
					</select>
          <label>Are you sure you want to delete this?</label>
          <br />
          <input type="radio" name="sure" id="sure" value="yes" required />
          <label htmlFor="sure">Yes</label>
          <br />
          <input type="submit" value="submit" />
        </Form>
      </Body>
    </Root>
  );
}
