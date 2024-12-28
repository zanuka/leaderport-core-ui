import { ConnectButton, SuiClientProvider, useWallets } from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { Box, Button, Container, Flex, Heading, Theme } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";
import { AchievementTester } from "./components/AchievementTester";

const devnetUrl = getFullnodeUrl("devnet");

function App() {
  const wallets = useWallets();
  const isConnected = wallets.length > 0;

  const openOptions = () => {
    const optionsUrl = chrome.runtime.getURL("options/index.html");
    chrome.tabs.create({ url: optionsUrl });
  };

  const networks = {
    devnet: { url: devnetUrl },
  };

  console.log("Debug: Package Address", import.meta.env.VITE_PACKAGE_ADDRESS);

  return (
    <Theme>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        <Flex
          position="sticky"
          px="4"
          py="2"
          direction="column"
          gap="2"
          style={{
            borderBottom: "1px solid var(--gray-a2)",
          }}
        >
          <Flex justify="between" align="center">
            <Box>
              <Heading size="4">LeaderPort</Heading>
            </Box>
            <Box>
              <Button variant="soft" onClick={openOptions}>
                Settings
              </Button>
            </Box>
          </Flex>
          <Box>
            <ConnectButton />
          </Box>
        </Flex>
        <Container>
          <Container
            mt="5"
            pt="2"
            px="4"
            style={{ background: "var(--gray-a2)", minHeight: 500 }}
          >
            <WalletStatus />
            {isConnected && <AchievementTester />}
          </Container>
        </Container>
      </SuiClientProvider>
    </Theme>
  );
}

export default App;
