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

4. Update addresses:
   - Copy the published package address
   - Update `Move.toml` with new address
   - Update frontend constants with new address

## Best Practices

1. Always develop on devnet first
2. Use separate addresses for development and production
3. Keep test wallets separate from real funds
4. Test thoroughly on devnet before moving to testnet
5. Only deploy to mainnet after comprehensive testing
