import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { login, AuthResponse as AuthResponse } from "../components/auth";
import querystring from "querystring";

const jsonLD = [
	{
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{
				"@type": "ListItem",
				position: 1,
				name: "ホーム",
				item: "https://www.w-pcp.net",
			},
		],
	},
];

import styles from "@/styles/Home.module.css";
import Root from "../components/root";
import Header from "../components/header";
import Title from "../components/title";
import Form from "../components/form";
import Body from "../components/body";

export default function Home() {
	return (
		<Root>

			<Title>Login</Title>

			<p>w-pcp.netにログインします。</p>
			<Body>
				<Form action="/login/auth">
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						id="username"
						name="username"
						autoComplete="username"
					/>
					<br />
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						id="password"
						name="password"
						autoComplete="current-password"
					/>
					<br />
					<input type="submit" id="submit" name="submit" value="Login" />
				</Form>
			</Body>
		</Root>
	);
}
