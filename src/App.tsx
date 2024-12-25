import { ConnectButton } from "@mysten/dapp-kit";
import { Box, Button, Container, Flex, Heading } from "@radix-ui/themes";
import { WalletStatus } from "./WalletStatus";

function App() {
  const openOptions = () => {
    const optionsUrl = chrome.runtime.getURL("options/index.html");
    chrome.tabs.create({ url: optionsUrl });
  };

  return (
    <>
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
        </Container>
      </Container>
    </>
  );
}

export default App;
