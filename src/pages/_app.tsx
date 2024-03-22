import { AppProps } from "next/app";
import "../styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

function App({ Component, pageProps }: AppProps) {
  
  return (
     <main>
           <Component {...pageProps} />
     </main>
  );
}

export default App;