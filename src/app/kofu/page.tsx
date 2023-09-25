import kofuStyles from "./kofu.module.css";
import Head from "next/head";
import Body from "../components/body";
import Title from "../components/title";
import Root from "../components/root";
import Link from "next/link";
import styles from "@/app/Home.module.css";
import { getUser } from "../components/auth";
import { headers } from "next/headers";
import { useEffect } from "react";

export default async function Home() {
  return (
    <Root>
      <Head>
        <title>早稲田中学校・高等学校 PCプログラミング部</title>
        <meta name="keywords" content="PCP,早稲田中学,プログラミング部," />
        <meta
          name="description"
          content="PCプログラミング部のホームページです。"
        />
        <meta
          property="og:description"
          content="PCプログラミング部のホームページです。"
        />
        <meta
          property="og:title"
          content="早稲田中学校・高等学校 PCプログラミング部"
        />
      </Head>

      <Title>早稲田中学校・高等学校 PCプログラミング部</Title>

      <p>興風祭では、PCPで遊ぼう！！</p>
      <Body>
        <p>詳細が出るまでしばらくお待ち下さい。</p>
        <h2>PCPとは</h2>
        <p>
          早稲田中学校・高等学校のPCプログラミング部の通称。
          <br />
          他の学校ではプログラミング部と呼ばれる部活に値します。
          <br />
          皆様もぜひPCPとお呼びください。
        </p>
        <h2>行うこと</h2>
        <ul>
          <li>
            部員が作ったゲームを公開、遊べるようにします！！
            <p>※状況によって追加される場合があります。</p>
          </li>
        </ul>
        <h2>日時</h2>
        <ins>9/30・10/1 9:00~16:00</ins>
        <a href="https://www.waseda-h.ed.jp/life/event_school/cultural_festival/">
          （公式）
        </a>
        <h2>参加方法</h2>
        <p>チケットは必要ありません。人数制限もないのでぜひ来てください！</p>
        <h2 id="cd">カウントダウン</h2>
        <iframe
          src="/kofu/countdown"
          className={kofuStyles.countdown}
          width="90vw"
          height="40vh"
          sandbox="allow-scripts"
          rel="nofollow"
          title="カウントダウン"
        ></iframe>
        <h2>場所</h2>
        <ins>早稲田中学校・高等学校</ins>
        <p>※更に詳細な場所は後ほどお知らせいたします。</p>
				<h2>関連リンク</h2>
				<a href="https://www.waseda-h.ed.jp/life/event_school/cultural_festival/">興風祭（文化祭） | 早稲田中学校・高等学校</a>
      </Body>
    </Root>
  );
}
