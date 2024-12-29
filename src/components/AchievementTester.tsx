import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import * as Form from "@radix-ui/react-form";
import { Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import { useState } from "react";
import { useAchievements } from "../hooks/useAchievements";
import { LeaderboardDisplay } from "../popup/components/LeaderboardDisplay";

export function AchievementTester() {
  const { isPending, error } = useAchievements();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [statusMessage, setStatusMessage] = useState<string>("");

  const { mutateAsync: signAndExecuteTransaction } =
    useSignAndExecuteTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tx = new Transaction();

      // Ensure category is one of the valid options
      if (!["gaming", "sports", "other"].includes(category)) {
        setStatusMessage(
          "Invalid category. Must be 'gaming', 'sports', or 'other'",
        );
        return;
      }

      console.log("Creating achievement with:", {
        title,
        description,
        category,
        timestamp: Date.now(),
        packageAddress: import.meta.env.VITE_PACKAGE_ADDRESS,
      });

      tx.moveCall({
        target: `${import.meta.env.VITE_PACKAGE_ADDRESS}::achievements::create_achievement`,
        arguments: [
          tx.pure.string(title),
          tx.pure.string(description),
          tx.pure.string(category.toLowerCase()),
          tx.pure.u64(Math.floor(Date.now() / 1000)),
        ],
        typeArguments: [],
      });

      await signAndExecuteTransaction({
        transaction: tx,
      });

      setStatusMessage("Achievement created successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
    } catch (err) {
      console.error("Failed to create achievement:", err);
      setStatusMessage("Failed to create achievement. Please try again.");
    }
  };

  return (
    <Container
      size={{
        initial: "4", // Widest size on mobile
        sm: "2", // More constrained on desktop
      }}
      my="2"
    >
      <Heading mb="2">Achievement Tester</Heading>

      <Flex
        direction="column"
        gap="4"
        className="bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4"
      >
        <Form.Root onSubmit={handleSubmit}>
          <Flex
            direction="column"
            gap="4"
            className="bg-zinc-800 rounded-lg p-6"
          >
            <Form.Field className="FormField" name="title">
              <div className="mb-2">
                <Form.Label className="text-zinc-100 text-base font-medium">
                  Title
                </Form.Label>
                <Form.Message
                  className="text-sm text-red-400"
                  match="valueMissing"
                >
                  Please enter a title
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="w-full px-4 py-3 rounded-md border border-zinc-700 
                           bg-zinc-900 text-zinc-100 placeholder-zinc-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter achievement title"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="description">
              <div className="mb-2">
                <Form.Label className="text-zinc-100 text-base font-medium">
                  Description
                </Form.Label>
                <Form.Message
                  className="text-sm text-red-400"
                  match="valueMissing"
                >
                  Please enter a description
                </Form.Message>
              </div>
              <Form.Control asChild>
                <textarea
                  className="w-full px-4 py-3 rounded-md border border-zinc-700 
                           bg-zinc-900 text-zinc-100 placeholder-zinc-500 min-h-[120px]
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Enter achievement description"
                />
              </Form.Control>
            </Form.Field>

            <Form.Field className="FormField" name="category">
              <div className="mb-2">
                <Form.Label className="text-zinc-100 text-base font-medium">
                  Category
                </Form.Label>
                <Form.Message
                  className="text-sm text-red-400"
                  match="valueMissing"
                >
                  Please select a category
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className="w-full px-4 py-3 rounded-md border border-zinc-700 
                           bg-zinc-900 text-zinc-100 placeholder-zinc-500
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  placeholder="gaming, sports, or other"
                />
              </Form.Control>
            </Form.Field>

            <Form.Submit asChild>
              <Button
                size="3"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-md"
                disabled={isPending}
              >
                {isPending ? "Creating..." : "Create Achievement"}
              </Button>
            </Form.Submit>
          </Flex>
        </Form.Root>

        {error && (
          <Text
            color="red"
            className="p-3 bg-red-100 dark:bg-red-900/50 rounded-md"
          >
            Error: {error.message}
          </Text>
        )}

        {statusMessage && (
          <Text
            color={statusMessage.includes("Failed") ? "red" : "green"}
            className="text-center"
          >
            {statusMessage}
          </Text>
        )}

        <LeaderboardDisplay />
      </Flex>
    </Container>
  );
}
