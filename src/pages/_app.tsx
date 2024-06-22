import { AppProps } from "next/app";
import "../styles/globals.css";
import { Noto_Sans_Thai } from 'next/font/google'
import FooterButton from "@/components/FooterButton";
import Sidebar from "@/components/Sidebar";
import { GlobalProvider } from "@/context/context";
import { appWithTranslation } from "next-i18next";
import nextI18nextConfig from '../../next-i18next.config';

const noto_sans_thai = Noto_Sans_Thai({ weight: '400', subsets: ['thai'] })

function App({ Component, pageProps }: AppProps) {

  return (
    <GlobalProvider>
      <main className={`${noto_sans_thai.className} bg-[#212529]`}>
        <Sidebar />
        <Component {...pageProps} />
        <FooterButton />
      </main>
    </GlobalProvider>
  );
}

export default appWithTranslation(App, nextI18nextConfig);

