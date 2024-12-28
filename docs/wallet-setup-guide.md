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

## Local Development Security Warnings

### Understanding the "Unable to verify site security" Warning
When testing locally, you'll see this warning:

This warning is **normal and expected** when:
1. Running on localhost (e.g., `localhost:5173`)
2. Testing development builds
3. Using devnet network

### Why This Happens
- The Sui wallet can't verify localhost URLs through normal SSL/security certificates
- Development environments don't have the same security validations as production sites
- This is a safety feature to alert users when interacting with non-production sites

### How to Proceed Safely
1. **Only proceed if you're expecting to test your local development**
2. Verify you're:
   - Connected to the correct localhost URL
   - Using your devnet wallet (not mainnet)
   - On the devnet network
3. Check the transaction details carefully before approving
4. Never approve unexpected transactions, even on devnet

### When to Be Concerned
The warning is concerning if you see it:
- On production websites
- When not doing local development
- On unexpected URLs
- When using mainnet wallets

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

4. **Gas Estimation Failed**
   - Symptom: "Gas estimation failed" error when approving transactions
   - Solutions:
     1. Verify you have enough SUI tokens
        - Check balance in wallet
        - Request more tokens using the "Request Devnet Tokens" button
     2. Check network connection
        - Ensure you're connected to devnet
        - Try disconnecting and reconnecting your wallet to the dApp
     3. Reset wallet connection
        - Click the connected dApp in wallet
        - Click "Disconnect"
        - Refresh your browser page
        - Reconnect the wallet
     4. Retry the transaction
        - Sometimes simply retrying after a few seconds works
     5. Check smart contract
        - Verify the package address is correct
        - Ensure contract is properly published to devnet

Note: Gas estimation failures are more common on devnet due to network congestion or RPC node issues. If the problem persists, try again after a few minutes.

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

## Creating New Sui Wallet Accounts

### Method 1: Using Sui Wallet Extension
1. Install the [Sui Wallet Extension](https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)
2. Click the Sui wallet icon in your browser
3. Click "More Options"
4. You'll see three options:
   - Set up Ledger
   - Create a new Passphrase Account
   - Import Existing Accounts (with sub-options for Import Passphrase and Import Private Key)
5. For a new development wallet, select "Create a new Passphrase Account"
6. **Important**: Save the new recovery phrase securely
   - Write it down physically
   - Store in a secure password manager
   - Label it clearly as "DEVNET WALLET"
7. Set a password for your wallet
8. Name your wallet (e.g., "Devnet Testing")

### Alternative Methods
1. **Set up Ledger**:
   - For hardware wallet users
   - Recommended for production/mainnet use
   - Not typically needed for development

2. **Import Existing Account**:
   - Import Passphrase: Use if you have a 12-word recovery phrase
   - Import Private Key: Use if you have a private key

### Managing Multiple Accounts
1. Switch between accounts:
   - Click the account dropdown in wallet
   - Select desired account
2. Best practices for multiple accounts:
   - Label each account clearly (e.g., "Devnet Testing", "Local Development")
   - Use different accounts for different networks
   - Keep track of which account is used for which purpose

### Network Configuration
After creating a new account:
1. Click the network selector (usually shows "Mainnet")
2. Switch to "Devnet" for development
3. **Request Devnet Tokens**:
   - Look for the "Request Devnet Tokens" button in your wallet
   - Click it to receive test SUI tokens
   - Wait a few seconds for tokens to appear
   - You should receive approximately 10 SUI
4. Verify your account shows the correct:
   - Network (should say "Devnet")
   - Balance (should show received tokens)

Note: The "Request Devnet Tokens" button in the wallet is the easiest way to get test tokens. Alternatively, you can use the [Sui Faucet](https://suiexplorer.com/faucet) website, but the in-wallet button is more convenient for development.

### Importing Devnet Wallet to Chrome Extension

1. **Get Your Recovery Phrase/Private Key**
   - If you have a wallet with 9.99 SUI on devnet, you'll need either:
     - The 12-word recovery phrase
     - Or the private key associated with that wallet

2. **Import to Chrome Extension**
   - Open Sui Wallet extension
   - Click "More Options"
   - Under "IMPORT EXISTING ACCOUNTS" choose either:
     - "Import Passphrase" (for 12-word recovery phrase)
     - "Import Private Key" (for private key)
   - Enter your recovery phrase or private key
   - Set a password for the wallet
   - Name your wallet (e.g., "Devnet Testing")

3. **Verify Setup**
   - Switch network to "Devnet" in wallet settings
   - Verify your balance shows 9.99 SUI
   - Try a small test transaction to confirm access

Note: If you don't have the recovery phrase or private key for the wallet with 9.99 SUI, you'll need to create a new wallet and request tokens from the faucet instead. 

### Transaction Approval and Gas Estimation

#### Understanding "Gas estimation failed"
When you see "Gas estimation failed" in the transaction approval screen:

1. **Don't Panic - This is Common on Devnet**
   - Gas estimation failures are frequent on devnet
   - Usually not a blocker for development
   - You can often proceed safely

2. **Before Clicking Approve**
   - Verify your devnet balance (should be ~10 SUI)
   - Check that transaction details match your expectations
   - Ensure you're on devnet network

3. **Safe to Proceed When**
   - You have sufficient balance (>1 SUI recommended)
   - You recognize the transaction details
   - You're using your devnet wallet
   - You're expecting this transaction

4. **Example: Creating an Achievement**
   - You click "Create Achievement" in the app
   - Wallet shows "Gas estimation failed"
   - You have ~10 SUI in your devnet wallet
   - Safe to click "Approve" and proceed
   - If transaction fails, simply try again

5. **How to Handle It**
   - Click "Approve" if the above conditions are met
   - The transaction will likely succeed despite the estimation error
   - If it fails, try again (devnet can be unstable)
   - If repeated failures occur, request new devnet tokens

Note: Gas estimation failures on devnet don't necessarily mean your transaction will fail. This is a known quirk of the devnet environment and usually safe to proceed with approval if you're using a development wallet. 
