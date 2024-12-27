# useAchievements Hook Documentation

## Overview
The `useAchievements` hook provides functionality to allow the LeaderPort UI to interact with achievements on the Sui blockchain. It enables querying existing achievements and creating new ones.

## Implementation

### Core Dependencies
```typescript
import { useCurrentAccount, useSuiClientQuery, useSuiClientMutation } from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Achievement } from "../types/Achievement";
```

### Hook Structure
```typescript
export function useAchievements() {
  const account = useCurrentAccount();

  // Query existing achievements
  const { data: achievements, isPending, error } = useSuiClientQuery(
    "getOwnedObjects",
    {
      owner: account?.address ?? "",
      filter: {
        StructType: `${PACKAGE_ADDRESS}::achievements::Achievement`,
      },
    },
    {
      enabled: !!account?.address,
    }
  );

  // Create new achievements
  const { mutate } = useSuiClientMutation("dryRunTransactionBlock");

  const addAchievement = async (achievement: Omit<Achievement, "id">) => {
    if (!account?.address) return;

    const tx = new TransactionBlock();
    tx.moveCall({
      target: `${PACKAGE_ADDRESS}::achievements::create_achievement`,
      arguments: [
        tx.pure(achievement.title),
        tx.pure(achievement.description),
        tx.pure(achievement.timestamp),
        tx.pure(achievement.category),
      ]
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
```

## Usage

### Basic Implementation
```typescript
function AchievementComponent() {
  const { achievements, isPending, error, addAchievement } = useAchievements();

  const createNewAchievement = async () => {
    await addAchievement({
      title: "First Win",
      description: "Won their first game",
      timestamp: Date.now(),
      category: "gaming"
    });
  };
}
```

## Key Features

1. **Achievement Querying**
   - Automatically fetches achievements owned by the current account
   - Updates when account changes
   - Provides loading and error states

2. **Achievement Creation**
   - Creates new achievements on the Sui blockchain
   - Handles transaction building and submission
   - Validates account connection

## Technical Details

### Query Parameters
- Uses `getOwnedObjects` RPC method
- Filters for specific achievement type using package address
- Enables query only when account is connected

### Transaction Building
- Creates new `TransactionBlock` for achievement creation
- Uses Move call to interact with smart contract
- Handles transaction serialization and submission

## Error Handling
- Returns error state from query
- Validates account connection before transactions
- Provides type-safe error handling

## Dependencies
- Requires `@mysten/dapp-kit` for Sui blockchain interaction
- Uses `@mysten/sui.js` for transaction handling
- Needs configured package address for smart contract

## Configuration
Ensure `PACKAGE_ADDRESS` is set to your deployed Move package address:
```typescript
const PACKAGE_ADDRESS = ""; // Add your package address here
```

## Best Practices
1. Always check for account connection before transactions
2. Handle loading and error states in UI
3. Validate achievement data before submission
4. Use TypeScript types for achievement data

For more information on Sui dApp development, refer to the [Sui dApp Kit documentation](https://sdk.mystenlabs.com/dapp-kit). 
