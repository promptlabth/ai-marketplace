import { AppProps } from "next/app";
import "../styles/globals.css";
import Head from 'next/head';


function App({ Component, pageProps }: AppProps) {

  return (
    <main>
      <Head>
        <title>Prompt Marketplace</title>
        <meta name="description" content="" />
      </Head>
      <Component {...pageProps} />
    </main>
  );
}

export default App;