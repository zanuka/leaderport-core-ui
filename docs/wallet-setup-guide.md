# Wallet Setup Guide for Development

## Why Use a Separate Development Wallet?

When developing with Sui, it's crucial to use a separate wallet for development and testing purposes. This guide explains the best practices for wallet management in development environments.

### Security Best Practices

1. **Never use your mainnet wallet for development**
   - Protects real assets from smart contract bugs
   - Prevents accidental mainnet deployments
   - Isolates development environment risks
   - Keeps test transactions separate from real transactions

2. **Create a Dedicated Devnet Wallet**
   - Use exclusively for local development and testing
   - Request test tokens from faucet
   - Keep development activities isolated

## Setting Up a Development Wallet

### Step 1: Create New Wallet
1. Open your Sui wallet extension
2. Click the profile icon
3. Select "Create New Wallet"
4. Save the seed phrase in a secure location (marked as devnet wallet)
5. Label the wallet clearly as "Development Wallet"

### Step 2: Configure for Devnet
1. Open wallet settings
2. Switch network to "Devnet"
3. Verify you're on devnet before any transactions

### Step 3: Get Test Tokens
1. Visit the [Sui Faucet](https://suiexplorer.com/faucet)
2. Connect your devnet wallet
3. Request test tokens
4. Verify tokens appear in your wallet

## Local Development

When testing locally:
- Use localhost URLs (e.g., `localhost:5173`)
- Expect "Unable to verify site security" warnings (normal for local development)
- Always verify you're using your devnet wallet before approving transactions
- Check transaction details carefully before approving

## Common Issues

1. **Wrong Network**
   - Symptom: Transactions fail
   - Solution: Verify wallet is on devnet

2. **Insufficient Funds**
   - Symptom: Cannot pay gas fees
   - Solution: Request more tokens from faucet

3. **Wrong Wallet Connected**
   - Symptom: Unexpected account/balance
   - Solution: Switch to development wallet

## Best Practices

1. Label wallets clearly
2. Keep separate seed phrases
3. Never store real assets in development wallets
4. Regularly check network settings
5. Use version control for smart contracts
6. Document wallet addresses used in testing

## Resources

- [Sui Faucet](https://suiexplorer.com/faucet)
- [Sui Wallet Guide](https://docs.sui.io/guides/developer/getting-started/sui-wallet)
- [Sui Developer Documentation](https://docs.sui.io/guides/developer) 
