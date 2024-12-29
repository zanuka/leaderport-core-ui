## Front-end State Management

### Zustand Implementation (Current)
We're currently using Zustand for state management due to its lightweight nature and excellent TypeScript support. The implementation follows a centralized store pattern with separate slices for different concerns:

```typescript
// Centralized Store Definition
interface OptionsState {
  someOption: boolean;
  setSomeOption: (value: boolean) => void;
  network: 'testnet' | 'mainnet';
  setNetwork: (network: 'testnet' | 'mainnet') => void;
  updateFrequency: number;
  setUpdateFrequency: (seconds: number) => void;
}

interface PopupState {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

// Store Implementation
export const useOptionsStore = create<OptionsState>((set) => ({
  someOption: false,
  setSomeOption: (value) => set({ someOption: value }),
  network: 'testnet',
  setNetwork: (network) => set({ network }),
  updateFrequency: 30,
  setUpdateFrequency: (seconds) => set({ updateFrequency: seconds }),
}));

export const usePopupStore = create<PopupState>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));

// Combined Store Hook
export const useStore = () => ({
  options: useOptionsStore(),
  popup: usePopupStore(),
});
```

### Store Organization

The stores are organized in a centralized `src/stores` directory with the following structure:

```
src/
├── stores/
│   ├── index.ts        # Main store exports and interfaces
│   ├── leaderboard.ts  # Leaderboard-specific state
│   └── settings.ts     # Settings and configuration state
```

### Implementation Strategy

1. **Centralized State Management:**
   - All stores are defined in `src/stores/index.ts`
   - Clear interfaces for each store slice
   - Combined store hook for accessing multiple slices

2. **Usage in Components:**
```tsx
function Options() {
  const { 
    someOption, 
    setSomeOption,
    network,
    setNetwork 
  } = useOptionsStore();

  return (
    <Container>
      <Select.Root value={network} onValueChange={setNetwork}>
        {/* Component JSX */}
      </Select.Root>
    </Container>
  );
}
```

3. **Benefits:**
   - Single source of truth for all state
   - Type-safe state management
   - Easy state sharing between extension views (popup, options, etc.)
   - Simplified testing and maintenance
   - Clear separation of concerns

### Getting Started

1. Install Zustand:
```bash
bun add zustand
# or
npm install zustand
```

2. Import and use stores:
```typescript
import { useOptionsStore, usePopupStore, useStore } from '../stores';

// Use individual stores
const { network } = useOptionsStore();

// Or use combined store
const { options, popup } = useStore();
```

For detailed implementation examples, see:
- [Options.tsx](./src/options/Options.tsx)
- [Popup.tsx](./src/popup/popup.tsx)
- [stores/index.ts](./src/stores/index.ts)

### Best Practices

1. **State Organization:**
   - Keep related state together in the same store
   - Use clear, descriptive names for state and actions
   - Define TypeScript interfaces for all store states

2. **Component Integration:**
   - Subscribe only to needed state
   - Use destructuring to access specific store values
   - Implement actions as store methods

3. **Extension-specific Considerations:**
   - Share state between popup and options pages
   - Use persistence when needed for settings
   - Handle initialization and cleanup properly
