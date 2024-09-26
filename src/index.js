import React from "react";
import { createRoot } from "react-dom/client";
import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";

import App from "./App";
import theme from "./chakraTheme/theme";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode="dark" />
    <App />
  </ChakraProvider>
);
