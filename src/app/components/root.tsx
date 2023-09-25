import "../globals.css";
import styles from "../Home.module.css";
import Head from "next/head";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import Footer from "./footer";
import Header from "./header";
import { UserInfo } from "./auth";
import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

interface HeaderProps {
  children: ReactNode;
  jsonLD?: any;
  user?: UserInfo;
}

const Root: React.FC<HeaderProps> = ({ children, jsonLD, user }) => {
  let head = (
    <script type="application/ld+json">{JSON.stringify(jsonLD)}</script>
  );
  if (!jsonLD) head = <></>;
  return (
    <div>
      <link rel="icon" href="/chusan-gray.png" />
      <Head>{head}</Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Header user={user} />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Root;
