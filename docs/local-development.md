# Local Development Workflow

## Setup

1. Install Sui CLI:
    brew install sui

2. Configure Sui client for devnet:
    sui client switch --env devnet

3. Import your wallet:
    sui keytool import "<your-12-word-seed-phrase>" ed25519

## Development Cycle

### 1. Making Changes to Move Contract
When modifying files in the `move/` directory:

1. Make your changes in `sources/achievements.move`
2. Publish the updated package:
    cd move
    sui client publish --gas-budget 100000000

3. Copy the new package ID from the output (look for "Created Objects" with "Owner: Immutable")
4. Update `.env` with new package ID:
    VITE_PACKAGE_ADDRESS="<new_package_id>"

5. Restart the development server to pick up the new environment variable

### 2. Testing Contract Changes

1. Verify package exists:
    sui client object <package-id>
    
    Expected output should show:
    - owner: Immutable
    - objType: package
    - Module containing Achievement struct and functions
    - Version mismatch warnings can be ignored

2. Check active wallet:
    sui client active-address

3. Ensure wallet has devnet SUI for gas fees

### 3. Frontend Integration

The frontend interacts with the Move contract through:
- `useAchievements.ts` hook for contract interactions
- Transaction signing via wallet extension
- Environment variables for package addressing

### Common Issues

1. **Package Not Found Error**
   - Verify package ID in `.env` matches latest publish
   - Ensure development server was restarted
   - Check wallet is on devnet network

2. **Transaction Signing Failed**
   - Verify wallet is connected
   - Ensure sufficient gas balance
   - Check network matches (devnet)

3. **Version Mismatch Warning**
   - This warning can be ignored if functionality works
   - Or switch to matching version RPC endpoint

## Best Practices

1. Always republish after Move contract changes
2. Keep track of package IDs for different deployments
3. Use separate wallets for development and production
4. Test transactions with minimal gas budget first
5. Add console logging for debugging 

## Development Entry Points

The application has three distinct entry points, each serving different purposes:

1. **Main Application** (`/src/main/index.html`)
   ```bash
   # Development
   npm run dev
   bun run dev
   pnpm dev

   # Preview build
   npm run preview
   bun run preview
   pnpm preview
   ```
   This is the primary application interface.

2. **Popup Interface** (`/src/popup/index.html`)
   ```bash
   # Development
   npm run dev:popup
   bun run dev:popup
   pnpm dev:popup

   # Preview build
   npm run preview:popup
   bun run preview:popup
   pnpm preview:popup
   ```
   Used for extension popup functionality.

3. **Options Page** (`/src/options/index.html`)
   ```bash
   # Development
   npm run dev:options
   bun run dev:options
   pnpm dev:options

   # Preview build
   npm run preview:options
   bun run preview:options
   pnpm preview:options
   ```
   Handles extension configuration and settings.

### Testing Configuration

The project uses Vitest for testing, configured in `vitest.config.ts`. Tests are:
- Located in `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
- Run in a JSDOM environment to simulate browser APIs
- Can be executed using:
  ```bash
  # Run tests
  npm run test
  bun run test
  pnpm test

  # Run tests with coverage
  npm run test:coverage
  bun run test:coverage
  pnpm test:coverage
  ``` 
