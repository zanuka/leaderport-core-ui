import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import styled from "styled-components";
import App from "../App";
import { networkConfig } from "../networkConfig";

const PopupWrapper = styled.div`
  width: 100%;
  min-width: 320px;
  height: 100%;
`;

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Theme appearance="dark">
        <PopupWrapper>
          <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networkConfig} defaultNetwork="devnet">
              <WalletProvider autoConnect>
                <App />
              </WalletProvider>
            </SuiClientProvider>
          </QueryClientProvider>
        </PopupWrapper>
      </Theme>
    </React.StrictMode>,
  );
}
