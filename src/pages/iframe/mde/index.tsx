"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Editor, useProvider } from "react-split-mde";
import "@/../public/react-split-mde/index.css";
import markdownToHtml from "zenn-markdown-html";
import styles from "@/app/Home.module.css";
import "@/app/globals.css";
import "./styles.css";

function MDE() {
	const [markdown, setMarkdown] = useState("");
	const handleValueChange = useCallback((newValue: string) => {
		setMarkdown(newValue);
	}, []);

	return (
		<Editor
			parser={async (text) => markdownToHtml(text)}
			value={markdown}
			onChange={handleValueChange}
		/>
	);
}

export default function Main() {
	return (
		<>
			<script src="/iframe/mde/main.js" async></script>
			<div style={{ height: "calc(100vh - 80px)" }}>
				<MDE />
			</div>
			<main>
				<div
					className={styles.description}
					style={{ height: "80px", width: "100vw" }}
				>
					<a href="https://github.com/steelydylan/react-split-mde" target="_top1">
						By <span className={styles.byFont}>react-split-mde</span>
					</a>
				</div>
			</main>
		</>
	);
}
