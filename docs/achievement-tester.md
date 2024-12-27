# Achievement Tester Component

The `AchievementTester.tsx` component serves as a development tool for testing achievement creation and validation on the Sui blockchain.

## Purpose
- Provides a UI for creating test achievements
- Validates achievement data structure
- Tests blockchain interaction flow
- Demonstrates proper type handling for Sui Move objects

## Key Features

### 1. Achievement Creation Testing
```typescript
// Tests the creation of new achievements with:
{
  title: string,      // Achievement name
  description: string,// Achievement details
  timestamp: number,  // When achievement was earned
  category: string    // Achievement category
}
```

### 2. Type Safety
- Uses TypeScript to ensure proper data structure
- Implements type guards for Sui Move object fields
- Validates data before blockchain submission

### 3. Error Handling
- Displays user-friendly error messages
- Handles wallet connection states
- Manages transaction failures gracefully

## Usage

1. Connect your wallet using the dApp Kit provider
2. Fill in achievement details in the form
3. Submit to create a test achievement
4. View the created achievement in your wallet

## Implementation Notes

- Uses `@mysten/dapp-kit` for blockchain interactions
- Implements the `useAchievements` hook for state management
- Provides real-time feedback on transaction status
- Serves as a reference for proper achievement creation flow

## Testing Considerations

1. **Wallet States**
   - Test with connected/disconnected wallet
   - Verify proper error handling
   - Check transaction feedback

2. **Data Validation**
   - Ensure required fields are present
   - Verify data type consistency
   - Check field length limits

3. **Transaction Flow**
   - Monitor gas usage
   - Verify object creation
   - Check achievement ownership

For implementation details, see `src/components/AchievementTester.tsx`. 
