import Head from "next/head";

import { useState } from "react";
import {
  MantineProvider,
  ColorSchemeProvider,
  // createEmotionCache,
} from "@mantine/core";
import { RouterTransition } from "../components/main/RouterTransition";
import "../styles/index.css";

export default function App({ Component, pageProps }) {
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <title>e-store</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{ colorScheme }}
          withNormalizeCSS
          withGlobalStyles
          withCSSVariables
          // emotionCache={createEmotionCache({ key: "mantine" })}
        >
          <RouterTransition />
          <Component {...pageProps} />
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
