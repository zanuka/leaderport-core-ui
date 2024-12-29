import "@mysten/dapp-kit/dist/index.css";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { createRoot } from "react-dom/client";
import Options from "./OptionSettings";

const queryClient = new QueryClient();

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Theme appearance="dark">
        <QueryClientProvider client={queryClient}>
          <Options />
        </QueryClientProvider>
      </Theme>
    </React.StrictMode>,
  );
} else {
  console.error("Container not found!");
}
