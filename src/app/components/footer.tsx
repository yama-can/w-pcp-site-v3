import styles from "../Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import LoginMenu from "./login-menu";

interface SimpleProps {}

const Footer: React.FC<SimpleProps> = ({}) => {
  return (
    <div className={styles.footer}>
      <div className={styles.description}>
        <div>
          <Link href="/" className={styles["no-animated-underline"]}>
            By{" "}
            <Image
              src="/chusan-gray.png"
              alt=""
              className={styles.byLogo}
              width={40}
              height={40}
              priority
            />
            <span className={styles.byFont}>W-PCP</span>
          </Link>
        </div>
      </div>

      <div className={styles.footer_links}>
        <div>
          <b>Pages</b>
          <Link href="/">ホーム</Link>
          <Link href="/kofu">興風祭</Link>
          <Link href="/blog">ブログ</Link>
          <Link href="/news">ニュース</Link>
        </div>

        <div>
          <b>Contact</b>
          <Link href="https://twitter.com/waseda_pcp">提案・報告</Link>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Footer;
