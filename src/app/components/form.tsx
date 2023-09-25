import styles from "../Home.module.css";
import { ReactNode } from "react";

const Form: React.FC<{ children: ReactNode; action?: string,method?:string }> = ({
	children,
	action,
	method
}) => {
	return (
		<div className={styles.form}>
			<form
				action={action || "#"}
				method={method || "post"}
				encType="application/x-www-form-urlencoded"
				className={styles.form}
			>
				{children}
			</form>
		</div>
	);
};

export default Form;
