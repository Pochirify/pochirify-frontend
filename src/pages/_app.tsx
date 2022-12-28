import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { MediaQueryProvider } from "../providers/MediaQueryProvider";
import { ModalProvider } from "providers/ModalProvider";
import { PaymentStateProvider } from "providers/PaymentStateProvider";
import { Layout } from "components/organisms/Layout";

const apolloClient = new ApolloClient({
  uri: "http://localhost:8080/api/query",
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
