# Front-end Details
LeaderPort's front end is designed to provide a seamless, responsive, and real-time leaderboard experience. It leverages Vue 3's Composition API for efficient component design, integrates TanStack's powerful libraries for data management, and uses Tailwind CSS for a clean, intuitive interface.

Key features of the front end include:
- Responsive design for both mobile and desktop browsers
- Real-time leaderboard updates using WebSockets
- Efficient data management with TanStack Query
- Type-safe development with TypeScript
- Fast development and build times with Vite
- Customizable and responsive UI with Tailwind CSS
- Comprehensive testing suite using Cypress and Vitest

## Front-end Architecture

LeaderPort's front end architecture is built on a modern, robust stack designed for performance, scalability, and developer productivity:

1. **Vue 3 with Composition API**: 
   - Leverages the latest Vue features for efficient and scalable component design
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

### Data Management Strategy

The application uses TanStack Query for efficient data management:

```typescript
// services/leaderboardQueries.ts
import { createQuery, createMutation } from '@tanstack/vue-query'

export const useLeaderboard = createQuery({
  queryKey: ['leaderboard'],
  queryFn: async () => {
    const response = await fetch('/api/leaderboard')
    return response.json()
  },
  staleTime: 1000 * 60 // 1 minute
})

export const useSubmitScore = createMutation({
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
import { ref, onMounted, onUnmounted } from 'vue'

export function useWebSocket() {
  const ws = ref<WebSocket | null>(null)
  
  onMounted(() => {
    ws.value = new WebSocket(import.meta.env.VITE_WS_URL)
    ws.value.onmessage = (event) => {
      // Handle real-time updates
    }
  })

  onUnmounted(() => {
    ws.value?.close()
  })

  return { ws }
}
```

### Testing Strategy

1. **Unit and Component Tests**:
   - Vitest for fast, ESM-native unit testing
   - Vue Testing Library for component testing

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
   - Error state management in Vue components

3. **Performance Monitoring**:
   - Client-side performance metrics
   - Error tracking and reporting
   - User experience monitoring

For state management details, see [State Management Guide](./state-management.md).

For TanStack implementation details, see [TanStack Details](./tanstack-details.md).

## Blockchain Integration

### Real-time and Blockchain Architecture

The frontend implements a dual-layer architecture to handle both real-time updates and blockchain interactions:

```typescript:src/services/LeaderboardService.ts
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

```typescript:src/blockchain/BlockchainClient.ts
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

```typescript:src/components/AchievementDisplay.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBlockchain } from '@/composables/useBlockchain'

const { mintAchievementNFT, getPlayerAchievements } = useBlockchain()
const achievements = ref<Achievement[]>([])

onMounted(async () => {
    achievements.value = await getPlayerAchievements()
})
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

```typescript:src/composables/useBlockchain.ts
export function useBlockchain() {
    const blockchainClient = inject('blockchainClient')
    const wallet = ref<SuiWallet | null>(null)
    const isConnected = ref(false)

    async function connectWallet() {
        wallet.value = await blockchainClient.connectWallet()
        isConnected.value = true
    }

    async function mintAchievementNFT(achievement: Achievement) {
        if (!isConnected.value) {
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

```typescript:src/utils/blockchainErrors.ts
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

These additions integrate seamlessly with the existing frontend architecture while adding the blockchain capabilities necessary for achievement immortalization and NFT features. Would you like me to expand on any particular aspect?
