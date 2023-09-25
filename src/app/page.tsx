import Head from "next/head";
import Body from "./components/body";
import Root from "./components/root";
import Header from "./components/header";
import Title from "./components/title";
import LoginMenu from "./components/login-menu";
import Link from "next/link";
import { getUser } from "./components/auth";
import { headers } from "next/headers";
import Cards from "./components/cards";
import Card from "./components/card";

const jsonLD = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "ホーム",
        item: "https://www.w-pcp.net",
      },
    ],
  },
];

export default async function Home() {
  return (
    <Root jsonLD={jsonLD}>
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

      <p>Welcome to W-PCP(Waseda-PCP)!!</p>
      <Body>
        <h2>PCPとは</h2>
        <p>
          早稲田中学校・高等学校のPCプログラミング部の通称。
          <br />
          他の学校ではプログラミング部と呼ばれる部活に値します。
          <br />
          皆様もぜひPCPとお呼びください。
        </p>
        <h2>普段の活動</h2>
        <p>
          普段は個別でプログラミングをしていますが、体験入部のときはいろいろなことを教えてくれます。
          <br />
          私も130回生で、2022年に体験入部を受けました。
          <br />
          普段使っている言語は、C++という言語です。
          <br />
          処理の速度が早いので、愛用されています。
        </p>
        <h2>
          <Link href="/img/yama.can/events" target="_top">
            イベント
          </Link>
        </h2>
        <h3>興風祭</h3>
        <p>やっぱりかなりの人が来る。超一大イベント。</p>
        <h3>JOI</h3>
        <p>
          日本情報オリンピック。中学生と高校生が出れるコンテストで、部内の人は全員参加する。
        </p>
        <h3>レギオ</h3>
        <p>
          JOI特訓用の公式コンテスト。いくつかの級みたいなものがあり、誰でも簡単に自分にあったコンテストを選べる。
        </p>
        <h3>バカゲーコンテスト</h3>
        <p>
          バカ面白いゲームを作るコンテスト。私はまだやったことがないのであまり知らない。
        </p>
        <Link href="/img/yama.can/events" target="_top">
          詳細はこちら
        </Link>
        <h2>コンテンツ</h2>
        <Cards>
          <Card href="/blog">
            {{
              title: "ブログ",
              description:
                "部員が作ったブログです パソコンや早稲田の日常など様々なことを紹介しています",
            }}
          </Card>
          <Card href="/news">
            {{
              title: "ニュース",
              description: "興風祭などの予定などを公開するニュースページです",
            }}
          </Card>
          <Card href="/kofu">
            {{
              title: "興風祭",
              description: "興風祭についてお知らせするページです",
            }}
          </Card>
        </Cards>
      </Body>
    </Root>
  );
}
