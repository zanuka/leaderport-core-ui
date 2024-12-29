import { useCurrentAccount, useSuiClientQuery } from "@mysten/dapp-kit";
import * as Collapsible from "@radix-ui/react-collapsible";
import { CaretDownIcon, CaretRightIcon } from "@radix-ui/react-icons";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useState } from "react";

export function OwnedObjects() {
  const [isOpen, setIsOpen] = useState(false);
  const account = useCurrentAccount();
  const { data, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address as string,
    },
    {
      enabled: !!account,
    },
  );

  if (!account) return null;
  if (error) return <Text color="red">Error: {error.message}</Text>;
  if (isPending || !data) return <Text color="gray">Loading...</Text>;

  return (
    <Box className="w-full">
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger className="w-full group">
          <Flex
            align="center"
            gap="2"
            className="p-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {isOpen ? (
              <CaretDownIcon className="text-zinc-500" />
            ) : (
              <CaretRightIcon className="text-zinc-500" />
            )}
            <Text weight="medium">View Owned Objects ({data.data.length})</Text>
          </Flex>
        </Collapsible.Trigger>

        <Collapsible.Content>
          <Box className="pt-2 pl-6">
            {data.data.length === 0 ? (
              <Text color="gray">No objects owned by this wallet</Text>
            ) : (
              <Flex direction="column" gap="2">
                {data.data.map((object) => (
                  <Box
                    key={object.data?.objectId}
                    className="p-3 rounded-md bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700"
                  >
                    <Text className="font-mono" size="2">
                      {object.data?.objectId}
                    </Text>
                  </Box>
                ))}
              </Flex>
            )}
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}
