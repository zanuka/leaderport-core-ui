import { Box, Container, Flex, Select, Switch, Text } from "@radix-ui/themes";
import React from "react";
import { useOptionsStore } from "../stores";

const Options: React.FC = () => {
  const {
    someOption,
    setSomeOption,
    network,
    setNetwork,
    updateFrequency,
    setUpdateFrequency,
  } = useOptionsStore();

  return (
    <Container size="2">
      <Flex direction="column" gap="4" p="4">
        <Box>
          <Text size="5" mb="2">
            Network Settings
          </Text>
          <Select.Root value={network} onValueChange={setNetwork}>
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="testnet">Testnet</Select.Item>
              <Select.Item value="mainnet">Mainnet</Select.Item>
            </Select.Content>
          </Select.Root>
        </Box>

        <Box>
          <Text size="5" mb="2">
            Update Frequency
          </Text>
          <Select.Root
            value={String(updateFrequency)}
            onValueChange={(value) => setUpdateFrequency(Number(value))}
          >
            <Select.Trigger />
            <Select.Content>
              <Select.Item value="15">Every 15 seconds</Select.Item>
              <Select.Item value="30">Every 30 seconds</Select.Item>
              <Select.Item value="60">Every minute</Select.Item>
            </Select.Content>
          </Select.Root>
        </Box>

        <Flex gap="2" align="center">
          <Switch checked={someOption} onCheckedChange={setSomeOption} />
          <Text>Enable Real-time Updates</Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Options;
