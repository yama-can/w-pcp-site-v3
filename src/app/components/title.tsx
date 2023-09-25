import Head from "next/head";
import styles from "../Home.module.css";
import Link from "next/link";

const Title: React.FC<{ children?: string }> = ({ children }) => {
  return (
    <>
      <title>{children}</title>
      <div className={styles.center}>
        <h1 className={styles.logo}>{children ? children : <p></p>}</h1>
      </div>
      <p>
        PCPのサイトが新しくなりました！
        <Link href="/news/yama.can/new">詳細はこちら</Link>
      </p>
    </>
  );
};

export default Title;
