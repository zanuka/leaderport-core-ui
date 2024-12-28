module 0x0::achievements {
    use std::string::{Self, String};

    /// Error codes
    const EINVALID_CATEGORY: u64 = 1;

    /// Valid categories
    const CATEGORY_GAMING: vector<u8> = b"gaming";
    const CATEGORY_SPORTS: vector<u8> = b"sports";
    const CATEGORY_OTHER: vector<u8> = b"other";

    /// A comprehensive achievement object
    public struct Achievement has key, store {
        id: UID,
        title: String,
        description: String,
        category: String,
        timestamp: u64,
        earned: bool
    }

    /// Create a new achievement
    public entry fun create_achievement(
        title: String,
        description: String,
        category: String,
        timestamp: u64,
        ctx: &mut TxContext
    ) {
        // Validate category
        assert!(
            category == string::utf8(CATEGORY_GAMING) ||
            category == string::utf8(CATEGORY_SPORTS) ||
            category == string::utf8(CATEGORY_OTHER),
            EINVALID_CATEGORY
        );

        let achievement = Achievement {       
            id: object::new(ctx),
            title,
            description,
            category,
            timestamp,
            earned: false
        };
        
        // Transfer the achievement to the transaction sender
        transfer::transfer(achievement, tx_context::sender(ctx));
    }

    /// Get the title of an achievement
    public fun get_title(achievement: &Achievement): String {
        achievement.title
    }

    /// Get the description of an achievement
    public fun get_description(achievement: &Achievement): String {
        achievement.description
    }

    /// Get the category of an achievement
    public fun get_category(achievement: &Achievement): String {
        achievement.category
    }

    /// Get the timestamp of an achievement
    public fun get_timestamp(achievement: &Achievement): u64 {
        achievement.timestamp
    }

    /// Check if an achievement is earned
    public fun is_earned(achievement: &Achievement): bool {
        achievement.earned
    }
}
