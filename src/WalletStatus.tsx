import { useCurrentAccount } from "@mysten/dapp-kit";
import { Container, Flex, Heading, Link, Text } from "@radix-ui/themes";
import { OwnedObjects } from "./OwnedObjects";

export function WalletStatus() {
  const account = useCurrentAccount();

  const renderWalletInstructions = () => (
    <Flex direction="column" gap="3">
      <Text weight="bold">Please follow these steps:</Text>
      <Text>
        1. Install the Sui Wallet Extension from the
        <Link
          href="https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil"
          target="_blank"
        >
          {" "}
          Chrome Web Store
        </Link>
      </Text>
      <Text>2. Create or import a wallet</Text>
      <Text>3. Refresh this page after setup is complete</Text>
    </Flex>
  );

  return (
    <Container my="2">
      <Heading mb="2">Sui Wallet Status</Heading>

      {account ? (
        <Flex direction="column">
          <Text>Wallet connected</Text>
          <Text>Address: {account.address}</Text>
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
