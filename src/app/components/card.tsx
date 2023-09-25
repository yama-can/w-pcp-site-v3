import styles from "../Home.module.css";
import Link from "next/link";

const Card: React.FC<{
	href: string;
	children: {
		title: string;
		description: string;
		editor?: string;
		editorUrl?: string;
	};
}> = ({ href, children }) => {
	return (
		<div className={styles.card}>
			<Link href={href} style={{ display: "block" }}>
				<h2>
					{children.title} <span>&gt;&gt;</span>
				</h2>
				<p className={styles["no-underline"]}>{children.description}</p>
			</Link>
			<br />
			{children.editor != undefined && children.editorUrl == undefined ? (
				<p>🖊{children.editor}</p>
			) : (
				<></>
			)}
			{children.editor != undefined && children.editorUrl != undefined ? (
				<Link href={children.editorUrl}>🖊{children.editor}</Link>
			) : (
				<></>
			)}
		</div>
	);
};

export default Card;
