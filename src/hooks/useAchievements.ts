import {
  useCurrentAccount,
  useSignTransaction,
  useSuiClientMutation,
  useSuiClientQuery,
} from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";

// Type to match Move struct
interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "gaming" | "sports" | "other";
  timestamp: number;
  earned: boolean;
}

// Type for creating new achievement
type CreateAchievementInput = Omit<Achievement, "id" | "earned">;

const PACKAGE_ADDRESS = import.meta.env.VITE_PACKAGE_ADDRESS;

export function useAchievements() {
  const account = useCurrentAccount();
  const { mutateAsync: signTransaction } = useSignTransaction();
  const { mutateAsync: executeTx } = useSuiClientMutation(
    "executeTransactionBlock",
  );

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

  const addAchievement = async ({
    title,
    description,
    category,
    timestamp,
  }: CreateAchievementInput) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::achievements::create_achievement`,
      arguments: [
        tx.pure.string(title),
        tx.pure.string(description),
        tx.pure.string(category),
        tx.pure.u64(timestamp),
      ],
    });

    try {
      // Sign the transaction using the hook
      const { bytes, signature } = await signTransaction({
        transaction: tx,
        chain: "sui:devnet", // Specify the correct chain
      });

      // Use the bytes and signature in your transaction execution
      const result = await executeTx({
        transactionBlock: bytes,
        signature: [signature],
        options: {
          showEffects: true,
        },
      });

      return result;
    } catch (error) {
      console.error("Failed to create achievement:", error);
      throw error;
    }
  };

  return {
    achievements,
    isPending,
    error,
    addAchievement,
  };
}
