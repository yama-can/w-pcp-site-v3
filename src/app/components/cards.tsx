import styles from "../Home.module.css";
import { ReactNode } from "react";

const Cards: React.FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={styles.grid}>{children}</div>;
};

export default Cards;
