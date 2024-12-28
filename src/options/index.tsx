import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import "@mysten/dapp-kit/dist/index.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "../App";

const queryClient = new QueryClient();

const networkConfig = {
  testnet: {
    url: "https://fullnode.testnet.sui.io",
  },
  mainnet: {
    url: "https://fullnode.mainnet.sui.io",
  },
};

const container = document.getElementById("app");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Theme appearance="dark">
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
            <WalletProvider autoConnect>
              <App />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </Theme>
    </React.StrictMode>,
  );
}
