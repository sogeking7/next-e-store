// import { useState } from "react";

import Head from "next/head";
import { AppProps } from "next/app";
// import { getCookie, setCookie } from "cookies-next";

import { MantineProvider, ColorScheme } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import { RouterTransition } from "../components/layouts/RouterTransition";
import "../styles/index.css";
import "../styles/embla/embla.css";

export default function App(props: AppProps & {colorScheme: ColorScheme}) {
  const {Component, pageProps } = props
  // const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
  
  // const toggleColorScheme = (value?: ColorScheme) => {
  //   const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
  //   setColorScheme(nextColorScheme);
  //   setCookie('mantine-color-scheme', nextColorScheme, { maxAge: 60 * 60 * 24 * 30 });
  // };
  return (
    <>
      <Head>
        <title>e-store</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      {/* <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      > */}
        <MantineProvider
          // theme={{ colorScheme }}
          withNormalizeCSS
          withGlobalStyles
          withCSSVariables
        >
          <RouterTransition />
          <NotificationsProvider>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      {/* </ColorSchemeProvider> */}
    </>
  );
}

// App.getInitialProps = async (appContext: AppContext) => {
//   const appProps = await NextApp.getInitialProps(appContext);
//   return {
//     ...appProps,
//     colorScheme: getCookie('mantine-color-scheme', appContext.ctx) || 'dark',
//   };
// };