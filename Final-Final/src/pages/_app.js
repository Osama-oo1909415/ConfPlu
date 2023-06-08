import "@/styles/globals.css";
import Aos from "aos";
import "aos/dist/aos.css";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
