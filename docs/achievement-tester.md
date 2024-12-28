# Achievement Tester Guide

## Component Overview
The `AchievementTester.tsx` component serves as a development tool for testing achievement creation and validation on the Sui blockchain.

### Purpose
- Provides a UI for creating test achievements
- Validates achievement data structure
- Tests blockchain interaction flow
- Demonstrates proper type handling for Sui Move objects

## Verifying Achievement Creation

### Checking Transaction Status
1. When you create an achievement:
   - The transaction may appear successful (no errors)
   - Your SUI balance might not change immediately
   - You need to verify the transaction completed

2. **How to Verify Success**:
   - Check the transaction in [Sui Explorer](https://suiexplorer.com/?network=devnet)
   - Copy your wallet address from the Sui wallet
   - Paste it in the explorer search
   - Look for your recent transaction
   - Check the transaction status and effects

3. **Expected Results**:
   - Transaction should show "Success"
   - You should see a new Achievement object created
   - Gas fees should be deducted (very small amount)
   - The achievement should appear in your app's list

### Common Issues
1. **Transaction Not Found**
   - The transaction might not have been submitted
   - Try creating the achievement again

2. **Transaction Failed**
   - Check the error message in explorer
   - Verify package address is correct
   - Ensure move call arguments match contract

3. **Achievement Not Showing**
   - Refresh your app
   - Check the achievements list
   - Verify wallet is still connected

### Debugging Steps
1. Open browser console for errors
2. Check `useAchievements` hook response
3. Verify contract package address
4. Try disconnecting and reconnecting wallet

### Checking Package Deployment

1. **Verify Package Address**
   - Check your `.env` file for `VITE_PACKAGE_ADDRESS`
   - Ensure it matches your deployed contract on devnet
   - Package address format should be like: `0x...`

2. **Verify Network**
   - Make sure you're checking the correct network in [Sui Explorer](https://suiexplorer.com/?network=devnet)
   - Select "Devnet" from the network dropdown (top-right)
   - Your wallet and explorer network must match

3. **No Data Found Issues**
   Common reasons:
   - Wrong network selected in explorer
   - Package not deployed to devnet
   - Incorrect package address in `.env`
   - Transaction didn't complete

4. **How to Find Your Package**
   - Go to [Sui Explorer Devnet](https://suiexplorer.com/?network=devnet)
   - Use the search bar to find:
     - Your wallet address
     - Your package address
     - Recent transactions
   - Check "Published" tab for your package

5. **Next Steps if Package Not Found**
   - Verify package deployment status
   - Check deployment logs
   - Try redeploying the package
   - Update `.env` with new package address

For deployment instructions, see `docs/sui-deployment-guide.md`.

## Implementation Notes

### Type Safety
- Uses TypeScript to ensure proper data structure
- Implements type guards for Sui Move object fields
- Validates data before blockchain submission

### Error Handling
- Displays user-friendly error messages
- Handles wallet connection states
- Manages transaction failures gracefully

### Testing Considerations
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
