import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from 'next/head';
import { Noto_Sans_Thai } from 'next/font/google'
const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

function App({ Component, pageProps }: AppProps) {

  return (
    <main className={noto_sans_thai.className}>
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}

export default App;