import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from 'next/head';
import { Noto_Sans_Thai } from 'next/font/google'
import FooterButton from "@/components/Footer_button";
import Sidebar from "@/components/Sidebar";

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

function App({ Component, pageProps }: AppProps) {

  return (
    <main className={`${noto_sans_thai.className} bg-[#212529]`}>
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <Sidebar />
      <Component {...pageProps} />
      <FooterButton />
    </main>
  );
}

export default App;