"use client";
import { useEffect } from "react";
import Head from "next/head";
import "./main.css";

export default function Countdown() {
  useEffect(() => {
    import("./script").then((script) => script.default());
  }, []);

  return (
    <>
      <Head>
        <title>興風祭カウントダウン</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="utf-8" />
        <script src="/kofu/countdown/main.js" charSet="utf-8" defer></script>
      </Head>

      <div className="countdown l">Loading...</div>
    </>
  );
}
