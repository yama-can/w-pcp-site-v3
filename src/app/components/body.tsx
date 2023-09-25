import styles from "../Home.module.css";
import { ReactNode } from "react";

const Body: React.FC<{
	children: ReactNode;
	width?: string;
	className?: string;
}> = ({ children, width, className }) => {
	return (
		<div
			className={styles.body + (className ? " " + className : "")}
			style={width ? { width } : {}}
		>
			{children}
		</div>
	);
};

export default Body;
