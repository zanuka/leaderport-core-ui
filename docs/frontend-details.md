# Front-end Details
LeaderPort's front end is designed to provide a seamless, responsive, and real-time leaderboard experience.

## Tech Stack Outline

> **Note**: This is a preliminary tech stack outline and may be subject to change as the project evolves.

- Front-end Stack:
  - React with [@mysten/dapp-kit](https://sdk.mystenlabs.com/dapp-kit) (for on-chain features)
  - TypeScript
  - TanStack Suite:
    - Query (for data management)
    - Table (for leaderboard display)
    - Form (for type-safe forms)
    - Router (for routing)
  - Vite (for build tooling)
  - Sui SDK Dependencies:
    - @mysten/dapp-kit ^0.14.44
    - @mysten/sui ^1.18.0
    - @tanstack/react-query ^5.62.10
- Back-end Stack:
  - Hono (for API and SSR)
  - Bun (for runtime)
  - TypeScript
  - Drizzle ORM (for database operations)
- Database:
  - Redis
- Cloud Infrastructure:
  - AWS (EC2 or ECS for hosting)
  - Amazon ElastiCache for Redis
  - S3 (for static asset hosting)
- CI/CD:
  - GitHub Actions
- Additional:
  - WebSocket (for real-time updates)
  - Docker (for containerization)
  - OpenAI (for natural language leaderboard queries)

## Front-end Architecture

LeaderPort's front end architecture is built on a modern, robust stack designed for performance, scalability, and developer productivity:

1. **React**: 
   - Leverages the latest features for efficient and scalable component design
   - Enables better code organization and reusability through composable functions

2. **TanStack Integration**:
   - Query for efficient data fetching and caching
   - Table for advanced leaderboard displays
   - Form for type-safe form handling
   - Router for client-side routing

3. **TypeScript**: 
   - Enhances code quality and developer experience with static typing
   - Provides better tooling support and helps catch errors early in development

4. **Tailwind CSS for Styling**: 
   - Utility-first CSS framework for creating a responsive and customizable UI
   - Enables rapid UI development with pre-built classes

5. **Vite as Build Tool**: 
   - Provides next-generation front end tooling
   - Offers near-instantaneous server start and hot module replacement (HMR)

6. **Sui dApp Kit Integration**:
   - Official Sui development toolkit for React applications
   - Provides seamless wallet connection and management
   - Includes React hooks for blockchain state and interactions
   - Simplifies transaction handling and smart contract interactions

7. **Walrus Wallet Integration**:
   - Primary supported wallet for Sui blockchain interactions
   - Secure transaction signing and account management
   - Built-in support for NFT viewing and management
   - Seamless integration with Sui dApp Kit

### Data Management Strategy

The application uses TanStack Query for efficient data management:

```typescript
// services/leaderboardQueries.ts
import { useQuery, useMutation } from '@tanstack/react-query'

export const useLeaderboard = () => useQuery({
  queryKey: ['leaderboard'],
  queryFn: async () => {
    const response = await fetch('/api/leaderboard')
    return response.json()
  },
  staleTime: 1000 * 60 // 1 minute
})

export const useSubmitScore = () => useMutation({
  mutationFn: async (score) => {
    const response = await fetch('/api/scores', {
      method: 'POST',
      body: JSON.stringify(score)
    })
    return response.json()
  }
})
```

### Real-time Updates

WebSocket integration for live updates:

```typescript
// composables/useWebSocket.ts
import { useEffect, useRef } from 'react'

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null)
  
  useEffect(() => {
    ws.current = new WebSocket(import.meta.env.VITE_WS_URL)
    ws.current.onmessage = (event) => {
      // Handle real-time updates
    }

    return () => {
      ws.current?.close()
    }
  }, [])

  return { ws: ws.current }
}
```

### Testing Strategy

1. **Unit and Component Tests**:
   - Vitest for fast, ESM-native unit testing

2. **End-to-End Tests**:
   - Cypress for comprehensive E2E testing
   ```typescript
   // cypress/integration/leaderboard.spec.ts
   describe('Leaderboard', () => {
     it('displays top players', () => {
       cy.visit('/leaderboard')
       cy.get('[data-testid="leaderboard-item"]').should('have.length', 10)
     })
   })
   ```

### Error Handling and Logging

The application uses a comprehensive error handling strategy:

1. **API Error Handling**:
   - TanStack Query's built-in error handling
   - Retry logic for failed requests
   - Error boundaries for component-level error handling

2. **Real-time Error Handling**:
   - WebSocket reconnection logic
   - Fallback to polling when WebSocket fails
   - Error state management in components

3. **Performance Monitoring**:
   - Client-side performance metrics
   - Error tracking and reporting
   - User experience monitoring

For state management details, see [State Management Guide](./state-management.md).

For TanStack implementation details, see [TanStack Details](./tanstack-details.md).

## Blockchain Integration

### Real-time and Blockchain Architecture

The frontend implements a dual-layer architecture to handle both real-time updates and blockchain interactions:

```typescript
//:src/services/LeaderboardService.ts

// Dual-layer leaderboard service
export class LeaderboardService {
    private realTimeDB: Database;
    private blockchainClient: BlockchainClient;

    constructor() {
        this.realTimeDB = new Database();
        this.blockchainClient = new BlockchainClient();
    }

    // Real-time layer for immediate updates
    async updateScore(score: Score): Promise<void> {
        await this.realTimeDB.update(score);
        
        // If score meets criteria, immortalize on blockchain
        if (this.isSignificantAchievement(score)) {
            await this.blockchainClient.immortalizeScore(score);
        }
    }

    // Blockchain layer for historical records
    async getHistoricalBest(): Promise<Score[]> {
        return this.blockchainClient.queryHistoricalRecords();
    }
}
```

### Blockchain Client Integration

```typescript
//:src/blockchain/BlockchainClient.ts
export class BlockchainClient {
    private provider: SuiProvider;
    private wallet: SuiWallet;

    // Handle wallet connections
    async connectWallet(): Promise<void> {
        this.wallet = await this.provider.requestWalletConnection();
    }

    // Interact with smart contracts
    async immortalizeScore(score: Score): Promise<TransactionResult> {
        const transaction = await this.provider.createTransaction({
            target: LEADERPORT_CONTRACT_ADDRESS,
            method: 'immortalize_score',
            arguments: [score]
        });
        
        return this.wallet.signAndSubmit(transaction);
    }

    // Subscribe to achievement events
    async subscribeToAchievements(): Promise<void> {
        this.provider.subscribeToEvents(
            LEADERPORT_CONTRACT_ADDRESS,
            'AchievementMinted',
            this.handleNewAchievement
        );
    }
}
```

### Achievement NFT Integration

```typescript
//:src/components/AchievementDisplay.tsx
<script setup lang="ts">
import { useEffect, useState } from 'react'
import { useBlockchain } from '@/hooks/useBlockchain'

export function AchievementDisplay() {
    const { mintAchievementNFT, getPlayerAchievements } = useBlockchain()
    const [achievements, setAchievements] = useState<Achievement[]>([])

    useEffect(() => {
        const loadAchievements = async () => {
            const data = await getPlayerAchievements()
            setAchievements(data)
        }
        loadAchievements()
    }, [])

    return (
        <div className="achievements-gallery">
            {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                    <img src={achievement.metadata.image} alt={achievement.metadata.title} />
                    <h3>{achievement.metadata.title}</h3>
                    <p>{achievement.metadata.description}</p>
                </div>
            ))}
        </div>
    )
}
</script>

<template>
    <div class="achievements-gallery">
        <div v-for="achievement in achievements" 
             :key="achievement.id" 
             class="achievement-card">
            <img :src="achievement.metadata.image" />
            <h3>{{ achievement.metadata.title }}</h3>
            <p>{{ achievement.metadata.description }}</p>
        </div>
    </div>
</template>
```

### Web3 Composables

```typescript
//:src/composables/useBlockchain.ts
import { useContext, useState } from 'react'
import { BlockchainContext } from '@/context/BlockchainContext'

export function useBlockchain() {
    const blockchainClient = useContext(BlockchainContext)
    const [wallet, setWallet] = useState<SuiWallet | null>(null)
    const [isConnected, setIsConnected] = useState(false)

    async function connectWallet() {
        const walletInstance = await blockchainClient.connectWallet()
        setWallet(walletInstance)
        setIsConnected(true)
    }

    async function mintAchievementNFT(achievement: Achievement) {
        if (!isConnected) {
            await connectWallet()
        }
        return blockchainClient.mintAchievementNFT(achievement)
    }

    return {
        wallet,
        isConnected,
        connectWallet,
        mintAchievementNFT
    }
}
```

### Error Handling and Logging

The blockchain integration includes specialized error handling:

```typescript
//:src/utils/blockchainErrors.ts
export class BlockchainError extends Error {
    constructor(
        message: string,
        public readonly code: string,
        public readonly transaction?: string
    ) {
        super(message)
    }
}

export function handleBlockchainError(error: unknown) {
    if (error instanceof BlockchainError) {
        // Handle specific blockchain errors
        switch (error.code) {
            case 'INSUFFICIENT_GAS':
                notifyUser('Please ensure your wallet has sufficient funds')
                break;
            case 'USER_REJECTED':
                notifyUser('Transaction was rejected')
                break;
            default:
                logError(error)
        }
    }
}
```

These additions integrate seamlessly with the existing frontend architecture while adding the blockchain capabilities necessary for achievement immortalization and NFT features. 

## Sui Integration

### Sui dApp Kit Integration

LeaderPort leverages the Sui dApp Kit for React components to handle wallet connections and blockchain interactions:

```typescript
//:src/providers/SuiProviders.tsx
import { 
  createNetworkConfig, 
  SuiClientProvider, 
  WalletProvider 
} from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const { networkConfig } = createNetworkConfig({
  mainnet: { url: getFullnodeUrl('mainnet') },
  testnet: { url: getFullnodeUrl('testnet') }
});

const queryClient = new QueryClient();

export function SuiProviders({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
```

### Sui TypeScript SDK Integration

The application uses the Sui TypeScript SDK for blockchain interactions:

```typescript
//:src/services/sui-client.ts
import { SuiClient } from '@mysten/sui/client';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import { TransactionBlock } from '@mysten/sui/transactions';

export class SuiService {
  private client: SuiClient;
  private keypair: Ed25519Keypair;

  constructor() {
    this.client = new SuiClient({
      url: getFullnodeUrl('mainnet')
    });
  }

  async submitScore(score: number, address: string) {
    const tx = new TransactionBlock();
    
    // Build transaction to submit score
    tx.moveCall({
      target: `${CONTRACT_ADDRESS}::leaderboard::submit_score`,
      arguments: [tx.pure(score)]
    });

    return await this.client.signAndExecuteTransactionBlock({
      transactionBlock: tx,
      requestType: 'WaitForLocalExecution'
    });
  }
}
```
