import { useState } from "react";
import Head from "next/head";
import NextApp, { AppProps, AppContext } from "next/app";
import { getCookie, setCookie } from "cookies-next";
import { MantineProvider, ColorScheme, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { RouterTransition } from "../components/layouts/RouterTransition";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "../styles/index.css";

export default function App(props: AppProps<{ session: Session }> & { colorScheme: ColorScheme }) {
  const { Component, pageProps: { session, ...pageProps } } = props
  const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  const [queryClient] = useState(() => new QueryClient());

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  };
  return (
    <>
      <Head>
        <title>e-store</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <SessionProvider session={session}>
        <ColorSchemeProvider
          colorScheme={colorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            theme={{
              colorScheme,
              fontFamily: "Inter, sans-serif"
            }}
            withNormalizeCSS
            withGlobalStyles
          >
            <RouterTransition />
            <NotificationsProvider>
              <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </SessionProvider>
    </>
  );
}


App.getInitialProps = async (appContext: AppContext) => {
  const appProps = await NextApp.getInitialProps(appContext);
  return {
    ...appProps,
    colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
  };
};