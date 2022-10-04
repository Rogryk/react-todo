import React from "react";
import { MantineProvider } from "@mantine/core";

const MantineCustomTheme = (props: any) => {
  return (
    <MantineProvider
      theme={{
        colorScheme: "dark",
        colors: {
          dark: [
            "#d5d7e0",
            "#acaebf",
            "#8c8fa3",
            "#666980",
            "#4d4f66",
            "#34354a",
            "#30353b", // changed from def
            "#1d1e30",
            "#0c0d21",
            "#01010a",
          ],
        },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      {props.children}
    </MantineProvider>
  );
};

export default MantineCustomTheme;
