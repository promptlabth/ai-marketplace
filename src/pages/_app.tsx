import { AppProps } from "next/app";
import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prompt Marketplac",
  description: "",
};

function App({ Component, pageProps }: AppProps) {
  
  return (
     <main>
           <Component {...pageProps} />
     </main>
  );
}

export default App;