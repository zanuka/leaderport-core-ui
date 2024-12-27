import {
  useCurrentAccount,
  useSuiClientMutation,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { Achievement } from "../types/Achievement";

const PACKAGE_ADDRESS = "0x..."; // Replace with your deployed package address

export function useAchievements() {
  const account = useCurrentAccount();

  // Query achievements
  const {
    data: achievements,
    isPending,
    error,
  } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address ?? "",
      filter: {
        StructType: `${PACKAGE_ADDRESS}::achievements::Achievement`,
      },
    },
    {
      enabled: !!account?.address,
    },
  );

  // Mutation to create achievement
  const { mutate } = useSuiClientMutation("dryRunTransactionBlock");

  const addAchievement = async (achievement: Omit<Achievement, "id">) => {
    if (!account?.address) return;

    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::achievements::create_achievement`,
      arguments: [
        tx.pure.string(achievement.title),
        tx.pure.string(achievement.description),
        tx.pure.u64(achievement.timestamp),
        tx.pure.string(achievement.category),
      ],
    });
    return mutate({
      transactionBlock: await tx.build(),
    });
  };

  return {
    achievements,
    isPending,
    error,
    addAchievement,
  };
}
