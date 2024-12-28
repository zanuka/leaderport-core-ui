import {
  useCurrentAccount,
  useSignAndExecuteTransaction,
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
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  console.log("Debug: Hook initialization", {
    PACKAGE_ADDRESS,
    accountExists: !!account,
    accountAddress: account?.address,
    env: import.meta.env,
  });

  const addAchievement = async ({
    title,
    description,
    category,
  }: CreateAchievementInput) => {
    if (!account?.address) {
      throw new Error("Wallet not connected");
    }

    console.log("Debug: Starting transaction", {
      packageAddress: PACKAGE_ADDRESS,
      walletAddress: account.address,
      network: "sui:devnet",
    });

    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::achievements::create_achievement`,
      arguments: [
        tx.pure.string(title),
        tx.pure.string(description),
        tx.pure.string(category),
        tx.pure.u64(Math.floor(Date.now() / 1000)),
      ],
    });

    try {
      console.log("Debug: Transaction block created", {
        tx,
        target: `${PACKAGE_ADDRESS}::achievements::create_achievement`,
      });

      const result = await signAndExecuteTransaction({
        transaction: tx,
        chain: "sui:devnet",
      });

      console.log("Debug: Transaction result", result);
      return result;
    } catch (error) {
      console.error("Debug: Transaction error", {
        error,
        packageAddress: PACKAGE_ADDRESS,
        walletAddress: account.address,
      });
      throw error;
    }
  };

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

  return {
    achievements,
    isPending,
    error,
    addAchievement,
  };
}
