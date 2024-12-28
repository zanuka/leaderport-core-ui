# Move Contract Documentation

## Contract Structure

### Move.toml
The `Move.toml` file is the package manifest for your Move project. It contains important metadata and configuration:

    [package]
    name = "leaderport-achievements"     # Name of your package
    version = "0.0.1"                    # Semantic versioning
    edition = "2024.beta"               # Move edition

    [dependencies]
    # Sui Framework dependency - required for basic Sui functionality
    Sui = { 
        git = "https://github.com/MystenLabs/sui.git", 
        subdir = "crates/sui-framework/packages/sui-framework", 
        rev = "framework/testnet" 
    }

    [addresses]
    achievements = "0x0"  # Initial placeholder address

### Achievements Module
Located in `sources/achievements.move`, this module defines the core achievement functionality:

    module 0x0::achievements {
        use std::string::String;

        /// Achievement struct defines the structure of an achievement
        public struct Achievement has key, store {
            id: UID,           // Unique identifier
            title: String,     // Achievement title
            description: String, // Achievement description
            category: String,   // Category (e.g., "gaming", "sports", "other")
            timestamp: u64,     // When the achievement was created
            earned: bool       // Achievement completion status
        }

        /// Creates a new achievement object
        public fun create_achievement(
            title: String,
            description: String,
            category: String,
            timestamp: u64,
            ctx: &mut TxContext
        ): Achievement {
            // ... implementation
        }
    }

## Publishing Process

### Initial Publication
1. Ensure your module address is set to `0x0` in both:
   - The module declaration (`module 0x0::achievements`)
   - The Move.toml file (`achievements = "0x0"`)

2. Publish the contract:

       sui client publish --gas-budget 100000000

3. After successful publication, you'll receive:
   - Package ID
   - Transaction digest
   - Published module address

4. Update your `Move.toml` with the new address:

       [addresses]
       achievements = "0x123...abc"  # Replace with actual address

### Making Changes and Republishing
1. When modifying the contract:
   - Update the code in `sources/achievements.move`
   - Increment the version in `Move.toml` if making breaking changes

2. Before republishing:
   - Reset the module address to `0x0` in both files
   - Follow the same publication process as above
   - Update the address in `Move.toml` with the new deployed address

### Best Practices
- Always test changes locally before deployment
- Keep track of deployed addresses for different networks (testnet, mainnet)
- Document breaking changes in version updates
- Use appropriate gas budget for complex contracts
- Back up previous versions before making changes

### Common Issues
1. **ArityMismatch Error**: Occurs when:
   - Function arguments don't match the contract definition
   - Parameters are passed in the wrong order
   - Missing required context parameters

2. **Address Mismatch**: Occurs when:
   - Module address isn't `0x0` during initial publication
   - Wrong address is used in Move.toml after deployment

3. **Gas Budget Issues**: Fix by:
   - Increasing gas budget in publish command
   - Optimizing contract code for efficiency

## Testing
- Use the Sui CLI for local testing:

      sui move test

- Test all functions before deployment
- Verify state changes work as expected
- Test error conditions and edge cases

## Security Considerations
- Carefully manage access control
- Validate all inputs
- Consider potential attack vectors
- Use appropriate visibility modifiers
- Test thoroughly before mainnet deployment
