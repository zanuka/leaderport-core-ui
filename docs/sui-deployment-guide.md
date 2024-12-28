# Sui Deployment Guide

## Networks Overview

Sui has three main networks:

### Devnet
- Frequent resets (every few weeks)
- Less stable, used for testing new Sui features
- First to receive protocol updates
- Shorter history, data cleared on resets
- Best for: Initial development, rapid testing, experimenting

### Testnet
- More stable, less frequent resets
- Closer to mainnet conditions
- Longer-running network
- Better for testing with real-world conditions
- Best for: Final testing before mainnet, integration testing, dApp demos

### Mainnet
- Production network
- Uses real SUI tokens
- Permanent, no resets
- Highest security and stability
- Best for: Production deployments

## Move Package Setup

### Directory Structure 

The Move package should be structured as follows:

    move/
    ├── Move.toml
    └── sources/
        └── achievements.move

### Move.toml Configuration

Your Move.toml file should contain:

    [package]
    name = "achievements"
    version = "0.0.1"

    [dependencies]
    Sui = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework/packages/sui-framework", rev = "framework/testnet" }

    [addresses]
    achievements = "0x0"  # Initially 0x0, update after deployment

## Development Setup

### Initial Configuration
1. Initialize Sui client:

    sui client

2. Configure for devnet:
   - RPC URL: `https://fullnode.devnet.sui.io:443`
   - Environment alias: `devnet`
   - Key scheme: `ed25519`

### Switching Networks

    sui client switch --env devnet

### Check Current Environment

    sui client active-env

### Create New Address

    sui client new-address ed25519

### Check Active Address

    sui client active-address

## Getting Test Tokens

There are three methods to obtain test tokens:

### 1. CLI Method

    sui client faucet

### 2. Web Faucet
- Visit https://faucet.devnet.sui.io/
- Enter your address
- Complete captcha

### 3. Discord Faucet
- Join [Sui Discord](https://discord.gg/sui)
- Go to #devnet-faucet channel
- Type `!faucet <your-address>`

### Verify Balance

    sui client gas

## Deployment Process

1. Ensure you're on the correct network (devnet for testing)
2. Have sufficient test tokens
3. Deploy package:

    sui client publish --gas-budget 100000000

4. After successful deployment, you'll receive a response containing:
   - Package ID (e.g., `0xf6af9f9e14afa32c874b44d636121a2ae75de9086ef9cf2ff6a1aaa120671101`)
   - Transaction digest
   - Created objects, including an `UpgradeCap` for future package upgrades
   - Gas costs in MIST (1 SUI = 1,000,000,000 MIST)

5. Update addresses:
   - Copy the published package address
   - Update `Move.toml` with new address
   - Update frontend constants with new address

## Verifying Deployment

### Check Package Status
After deployment, verify these key components in the transaction output:
1. Package ID - This is your new package address
2. Transaction Status - Should show "Success"
3. Created Objects - Look for:
   - The `UpgradeCap` object (needed for future upgrades)
   - Any other objects initialized during deployment
4. Gas Usage - Review the cost in MIST to estimate future deployment costs

### Troubleshooting "No Data Found"
If you can't find your package in Sui Explorer:

> ⚠️ **Most Common Issue**: Wrong network selected in Sui Explorer
> - Always check the network dropdown in top-right corner
> - Make sure "Devnet" is selected when working with devnet
> - Your wallet network and explorer network must match

1. **Verify Network First**
   - Go to [Sui Explorer](https://suiexplorer.com/?network=devnet)
   - Look for network selector in top-right
   - Select "Devnet" from dropdown
   - Confirm network matches your wallet

2. **Verify Package Address**
   - Check your `.env` file for `VITE_PACKAGE_ADDRESS`
   - Ensure it matches your deployed contract on devnet
   - Package address format should be like: `0x...`

3. **Finding Your Package**
   - Go to [Sui Explorer Devnet](https://suiexplorer.com/?network=devnet)
   - Use the search bar to find:
     - Your wallet address
     - Your package address
     - Recent transactions
   - Check "Published" tab for your package

4. **Resolution Steps**
   - Verify package deployment status
   - Check deployment logs
   - Try redeploying the package
   - Update `.env` with new package address

### Update Configuration Files
1. In Move.toml, update the address:

    [addresses]
    achievements = "0x<your-package-id>"  # Replace with actual package ID

2. In your frontend configuration (e.g., useAchievements.ts), update the constant:

    const PACKAGE_ADDRESS = "0x<your-package-id>";  # Replace with actual package ID

3. Commit these changes to version control with the transaction ID in the commit message
   for future reference

### Post-Deployment Verification
1. Verify your package is queryable:
   ```bash
   sui client object <package-id>
   ```

2. Test core functionality:
   - Run through key features using the CLI or frontend
   - Verify object creation and transactions work as expected
   - Check event emissions if your package uses them

3. Document deployment:
   - Record the network (devnet/testnet/mainnet)
   - Save the package ID
   - Note any initialization parameters or created objects
   - Document gas costs for future deployments

## Best Practices

1. Always develop on devnet first
2. Use separate addresses for development and production
3. Keep test wallets separate from real funds
4. Test thoroughly on devnet before moving to testnet
5. Only deploy to mainnet after comprehensive testing
