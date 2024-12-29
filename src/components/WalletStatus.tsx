import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";

export function WalletStatus() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();

  const renderWalletInstructions = () => (
    <Flex direction="column" gap="3">
      <Text weight="bold">Please follow these steps:</Text>
      <Text>1. Connect your Sui Wallet using the button below</Text>
      <Text>2. Create or import a wallet if you haven't already</Text>
      <Text>3. Refresh this page after setup is complete</Text>
      <ConnectButton />
    </Flex>
  );

  return (
    <Container size={{ initial: "4", sm: "2" }} my="2">
      <Heading mb="2">Sui Wallet Status</Heading>

      {account ? (
        <Flex direction="column" gap="3">
          <Text>Wallet connected</Text>
          <Text>Address: {account.address}</Text>
          <Button
            onClick={() => disconnect()}
            size="2"
            variant="soft"
            color="red"
          >
            Disconnect Wallet
          </Button>
          <OwnedObjects />
        </Flex>
      ) : (
        <Flex direction="column" gap="4">
          <Text color="red">Wallet not connected</Text>
          {renderWalletInstructions()}
        </Flex>
      )}
    </Container>
  );
}
