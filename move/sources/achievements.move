module leaderport_achievements::achievements {
    use std::string::String;

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
    public fun create_achievement(
        title: String,
        description: String,
        category: String,
        timestamp: u64,
        ctx: &mut TxContext
    ): Achievement {
        Achievement {       
            id: object::new(ctx),
            title,
            description,
            category,
            timestamp,
            earned: false
        }
    }
}
