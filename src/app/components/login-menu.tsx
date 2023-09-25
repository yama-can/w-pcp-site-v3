import { createClient } from "@supabase/supabase-js";
import styles from "../Home.module.css";
import { UserInfo, getUser } from "./auth";
import { headers } from "next/headers";
import Link from "next/link";

const LoginMenu: React.FC<{ user?: UserInfo }> = async ({ user }) => {
  if (!user) {
    return (<></>);
  }
  if (user) {
    return (
      <div className={styles.login}>
        <details>
          <summary>
            <p>{user.username}</p>
          </summary>
          <div className={styles.login_controls}>
            <Link href="/dashboard" target="_top">
              Dashboard
            </Link>
            <Link href="/logout" target="_top">
              Logout
            </Link>
          </div>
        </details>
      </div>
    );
  } else {
    return (
      <div className={styles.login}>
        <Link href="/login" className={styles["no-animated-underline"]}>
          Login
        </Link>
      </div>
    );
  }
};

export default LoginMenu;
