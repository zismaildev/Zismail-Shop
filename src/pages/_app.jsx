import { SessionProvider } from 'next-auth/react';
import { NextUIProvider } from "@nextui-org/react";
import Layout from "../components/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </NextUIProvider>
    </SessionProvider>
  );
}
