import "../styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MediaQueryProvider } from "../providers/MediaQueryProvider";
import { ModalProvider } from "providers/ModalProvider";
import { PaymentStateProvider } from "providers/PaymentStateProvider";
import { Layout } from "components/organisms/Layout";

if (process.env.NEXT_PUBLIC_BACKEND_URL === undefined) {
  throw new Error("process.env.NEXT_PUBLIC_BACKEND_URL is undefined");
}
const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_BACKEND_URL,
  cache: new InMemoryCache(),
});

export default function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <MediaQueryProvider>
      <ModalProvider>
        <PaymentStateProvider>
          <ApolloProvider client={apolloClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </PaymentStateProvider>
      </ModalProvider>
    </MediaQueryProvider>
  );
}
