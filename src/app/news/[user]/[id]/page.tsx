import Body from "@/app/components/body";
import getDB from "@/app/components/database";
import Root from "@/app/components/root";
import Title from "@/app/components/title";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import styles from "../../../Home.module.css";
import markdownToHtml from "zenn-markdown-html";
import Link from "next/link";
import Cards from "@/app/components/cards";
import Card from "@/app/components/card";
import "react-split-mde/css/index.css";
import { getUser } from "@/app/components/auth";
import { headers } from "next/headers";
import { Permission, isContainPermission } from "@/app/components/permissions";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export default async function BlogPage({
	params,
}: {
	params: { [key: string]: string };
}) {
	if (
		params.user.toLowerCase() != params.user ||
		params.id.toLowerCase() != params.id
	) {
		return new Response("", {
			status: 301,
			headers: {
				location: `/news/${params.user.toLowerCase()}/${params.id.toLowerCase()}`,
			},
		});
	}
	const db = getDB();
	const user = await getUser({
		type: "cookie",
		value: headers().get("cookie"),
	});
	const users = await db.from("users").select("*").filter("username", "eq", params.user);
	if (users.error) {
		return (
			<Root>
				<Title>News</Title>
				<p>読み込みに失敗しました。再読み込みしてください。</p>
			</Root>
		);
	}

	let pubFunc = (e: PostgrestFilterBuilder<any, any, any[], unknown>) =>
		e.filter("public", "eq", true);
	if (user && isContainPermission(user.permission, Permission.poster)) {
		pubFunc = (e) => e;
	}

	if (!users.data.find((col) => col.username == params.user)) {
		notFound();
	}

	const post = await pubFunc(
		db
			.from("posts")
			.select("*")
			.filter(
				"author",
				"eq",
				users.data.find((col) => col.username == params.user).id
			)
			.filter("type", "eq", 1)
	).ilike("post_id", params.id);

	if (post.error) {
		return (
			<Root>
				<Title>News</Title>
				<p>読み込みに失敗しました。再読み込みしてください。</p>
			</Root>
		);
	}

	if (post.data.length == 0) {
		notFound();
	}

	const username = users.data.find(
		(col) => col.username == params.user
	).username;

	return (
		<Root>
			<Title>{`${user && isContainPermission(user.permission, Permission.poster)
				? post.data[0].public
					? "🔓"
					: "🔒"
				: ""
				}${(post.data[0].content as string).split("\n")[0].startsWith("# ")
					? (post.data[0].content as string)
						.split("\n")[0]
						.slice(2)
						.replace(/[\s|\t]*/, "")
					: params.id
				} | News`}</Title>

			<div className={styles.description}>
				<p>{new Date(post.data[0].created_at).toLocaleDateString("ja")}</p>
				<Link href={`/news/${params.user}`}>By {username}</Link>
			</div>
			<hr />

			<Body>
				<div
					className={`react-split-mde-preview ${styles["react-split-mde-preview"]}`}
					dangerouslySetInnerHTML={{
						__html: markdownToHtml(
							(post.data[0].content as string).split("\n")[0].startsWith("# ")
								? (post.data[0].content as string)
									.split("\n")
									.slice(1)
									.join("\n")
								: post.data[0].content,
							{ embedOrigin: "https://embed.zenn.studio/" }
						),
					}}
				></div>
			</Body>

			<br />
			<hr />

			<p>興風祭などの予定などを公開するニュースページです。</p>

			<Cards>
				<Card href="/news">
					{{
						title: "トップへ戻る",
						description: "投稿一覧に戻る",
					}}
				</Card>
				<Card href={`/news/${username}`}>
					{{
						title: "他の投稿を見る",
						description: "作成者が同じ他の投稿を閲覧する",
					}}
				</Card>
				{user &&
					(user.username == params.username ||
						isContainPermission(user.permission, Permission.manager)) ? (
					<>
						<Card
							href={`/dashboard/edit_post?user_id=${encodeURIComponent(
								params.user
							)}&post_id=${encodeURIComponent(params.id)}&type=1`}
						>
							{{
								title: "編集する",
								description: "投稿を編集する",
							}}
						</Card>
						<Card
							href={`/dashboard/delete_post?user_id=${encodeURIComponent(
								params.user
							)}&post_id=${encodeURIComponent(params.id)}&type=1`}
						>
							{{
								title: "削除する",
								description: "投稿を削除する",
							}}
						</Card>
					</>
				) : (
					<></>
				)}
			</Cards>
		</Root>
	);
}
