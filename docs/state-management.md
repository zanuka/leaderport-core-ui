## Front-end State Management

### Valtio Implementation (Current)
We're using Valtio for state management due to its optimal handling of complex state relationships, performance requirements, and Web3 integration needs. The implementation follows a proxy-based pattern with separate stores for different concerns:

```typescript
// Centralized Store Definition
import { proxy, subscribe } from 'valtio';

interface OptionsState {
  someOption: boolean;
  network: 'testnet' | 'mainnet';
  updateFrequency: number;
}

interface PopupState {
  isOpen: boolean;
}

// Store Implementation
export const optionsStore = proxy<OptionsState>({
  someOption: false,
  network: 'testnet',
  updateFrequency: 30,
});

export const popupStore = proxy<PopupState>({
  isOpen: false,
});

// Actions
export const optionsActions = {
  setSomeOption(value: boolean) {
    optionsStore.someOption = value;
  },
  setNetwork(network: 'testnet' | 'mainnet') {
    optionsStore.network = network;
  },
  setUpdateFrequency(seconds: number) {
    optionsStore.updateFrequency = seconds;
  }
};

export const popupActions = {
  setIsOpen(value: boolean) {
    popupStore.isOpen = value;
  },
  toggle() {
    popupStore.isOpen = !popupStore.isOpen;
  }
};
```

### Store Organization

The stores are organized in a centralized `src/stores` directory with the following structure:

```
src/
├── stores/
│   ├── index.ts        # Main store exports
│   ├── leaderboard.ts  # Leaderboard-specific state
│   └── settings.ts     # Settings and configuration state
```

### Implementation Strategy

1. **Centralized State Management:**
   - All stores are defined in separate files under `src/stores`
   - Clear TypeScript interfaces for each store
   - Action creators for state mutations
   - Subscription capabilities for state changes

2. **Usage in React Components:**
```tsx
import { useSnapshot } from 'valtio';
import { optionsStore, optionsActions } from '../stores';

function Options() {
  const { someOption, network } = useSnapshot(optionsStore);

  return (
    <Container>
      <Select.Root 
        value={network} 
        onValueChange={optionsActions.setNetwork}
      >
        {/* Component JSX */}
      </Select.Root>
    </Container>
  );
}
```

3. **Usage in React Native:**
```tsx
import { useSnapshot } from 'valtio';
import { View, Text, Pressable } from 'react-native';
import { optionsStore, optionsActions } from '../stores';

function MobileOptions() {
  const { someOption, network } = useSnapshot(optionsStore);

  return (
    <View>
      <Pressable 
        onPress={() => optionsActions.setNetwork(
          network === 'testnet' ? 'mainnet' : 'testnet'
        )}
      >
        <Text>Current Network: {network}</Text>
      </Pressable>
    </View>
  );
}
```

4. **Benefits:**
   - Direct state mutations for better readability
   - Proxy-based updates for optimal performance
   - Automatic batching of state updates
   - Built-in TypeScript support
   - Cross-platform compatibility

### Getting Started

1. Install Valtio:
```bash
bun add valtio
# or
npm install valtio
```

2. Import and use stores:
```typescript
import { useSnapshot } from 'valtio';
import { optionsStore, optionsActions } from '../stores';

// Use store state
const { network } = useSnapshot(optionsStore);

// Update state
optionsActions.setNetwork('mainnet');
```

For detailed implementation examples, see:
- [Options.tsx](./src/options/Options.tsx)
- [Popup.tsx](./src/popup/popup.tsx)
- [stores/index.ts](./src/stores/index.ts)

### Best Practices

1. **State Organization:**
   - Keep related state in dedicated store files
   - Use clear TypeScript interfaces
   - Implement action creators for state mutations
   - Use computed values for derived state

2. **Component Integration:**
   - Use `useSnapshot` for reactive state
   - Subscribe only to needed state properties
   - Implement actions as separate objects
   - Use TypeScript for better type safety

3. **Extension-specific Considerations:**
   - Share state between popup and options pages
   - Use `chrome.storage` for persistence when needed
   - Handle initialization and cleanup properly
   - Implement error boundaries for state crashes

4. **React Native Considerations:**
   - Use `useSnapshot` for optimal mobile performance
   - Implement platform-specific actions when needed
   - Handle offline state appropriately
   - Consider AsyncStorage for persistence

### Advanced Usage

1. **Computed Values:**
```typescript
import { derive } from 'valtio/utils';

const derivedStore = derive({
  get totalScores() {
    return leaderboardStore.scores.reduce((sum, score) => sum + score.value, 0);
  }
});
```

2. **Subscriptions:**
```typescript
import { subscribe } from 'valtio';

subscribe(optionsStore, () => {
  console.log('Options updated:', optionsStore.network);
});
```

3. **State Persistence:**
```typescript
import { proxyWithPersist } from 'valtio/utils';

export const persistedStore = proxyWithPersist({
  theme: 'light',
  language: 'en',
}, {
  name: 'app-settings',
  storage: chrome.storage.local,
});
```

4. **Async Actions:**
```typescript
export const leaderboardActions = {
  async fetchScores() {
    try {
      leaderboardStore.loading = true;
      const scores = await api.getScores();
      leaderboardStore.scores = scores;
    } finally {
      leaderboardStore.loading = false;
    }
  }
};
```
