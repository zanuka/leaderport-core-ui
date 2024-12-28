# SuiFrens Integration Guide

<img src="../images/suifrens.png" alt="Sui" width="128" />

LeaderPort leverages [SuiFrens](https://suifrens.com/) for its NFT Achievement System, creating a unique and engaging way to represent user accomplishments on the Sui blockchain.

## Overview

SuiFrens are customizable NFT characters on the Sui blockchain that can be used to represent achievements and milestones within LeaderPort. By integrating with SuiFrens, we can create dynamic, evolving achievement badges that users can collect, trade, and showcase.

## Implementation Details

### Dynamic NFT Minting

- Utilize Sui's dynamic fields to create evolving SuiFren achievements
- Implement progressive trait unlocks based on user accomplishments
- Use SuiFrens' trait system for achievement representation
- Enable achievement-based character customization

```move
// Example Move code for dynamic trait updates
public entry fun update_achievement_traits(
    fren: &mut SuiFren,
    achievement: &Achievement,
    ctx: &mut TxContext
) {
    // Update SuiFren traits based on achievement
    if (is_earned(achievement)) {
        add_trait(fren, get_achievement_trait(achievement));
    }
}
```

### Rarity Tiers

- Implement achievement-based rarity system
- Tie rarity levels to achievement difficulty
- Create special edition SuiFrens for major milestones
- Enable trait combinations based on achievement sets

### Trading System

- Leverage Sui's Kiosk primitive for secure trading
- Implement achievement verification in transfer policies
- Enable community marketplace integration
- Support achievement bundle trading

### Achievement Showcase

- Utilize Object Display standard for achievement visualization
- Create dynamic display properties based on unlocked traits
- Enable cross-platform achievement sharing
- Implement achievement collection galleries

## Technical Integration

### Required Dependencies
```toml
[dependencies]
sui-framework = { git = "https://github.com/MystenLabs/sui.git", subdir = "crates/sui-framework", rev = "framework/testnet" }
suifrens = { git = "https://github.com/suifrens/suifrens.git" }
```

### Key Components

1. **Achievement Tracker**
   - Monitors user progress
   - Triggers trait updates
   - Manages achievement state

2. **Trait Manager**
   - Handles SuiFren trait updates
   - Manages achievement-based customization
   - Controls rarity distribution

3. **Display Controller**
   - Manages achievement visualization
   - Handles cross-platform display
   - Controls trait rendering

## Best Practices

1. **Achievement Design**
   - Create meaningful achievement tiers
   - Balance rarity distribution
   - Design engaging trait combinations

2. **User Experience**
   - Implement smooth trait transitions
   - Provide clear achievement progress
   - Enable easy achievement sharing

3. **Security**
   - Verify achievement completion
   - Implement secure trading policies
   - Protect user achievements

## Future Enhancements

- Cross-game achievement integration
- Advanced trait combination system
- Community-driven achievement creation
- Enhanced trading features

## Resources

- [SuiFrens Official Documentation](https://suifrens.com/about)
- [Sui Object Display Standard](https://docs.sui.io/standards/display)
- [Sui Kiosk Documentation](https://docs.sui.io/standards/kiosk)

## Notes

- All SuiFren integrations should follow the official standards
- Regular updates to trait systems may be required
- Community feedback should guide feature development 
