import React from "react";
import { createRoot } from "react-dom/client";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyle from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "react-query";
import { theme } from "./style/theme";
import HelmetComponent from "./style/HelmetComponent";
import { ReactQueryDevtools } from "react-query/devtools";

const client = new QueryClient();

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={client}>
        <ThemeProvider theme={theme}>
          <HelmetComponent />
          <GlobalStyle />
          <App />
          <ReactQueryDevtools initialIsOpen={true} />
        </ThemeProvider>
      </QueryClientProvider>
    </RecoilRoot>
  </React.StrictMode>
);
