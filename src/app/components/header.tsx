import styles from "../Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import LoginMenu from "./login-menu";
import { getUser } from "./auth";
import { UserInfo } from "./auth";

interface SimpleProps {
  user?: UserInfo;
}

const Header: React.FC<SimpleProps> = async ({ user }) => {
  return (
    <>
      <div className={styles.description}>
        <Link href="/" className={styles["no-animated-underline"]}>
          <span className={styles.byFont}>
            <Image
              src="/chusan-gray.png"
              alt=""
              width={40}
              height={40}
              className={styles.byLogo}
              priority
            />
            W-PCP
          </span>
        </Link>
        <LoginMenu user={user}></LoginMenu>
      </div>
    </>
  );
};

export default Header;
