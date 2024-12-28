public entry fun create_achievement(
    title: String,
    description: String,
    category: String,
    timestamp: u64,
    ctx: &mut TxContext
) {
    let achievement = Achievement {       
        id: object::new(ctx),
        title,
        description,
        category,
        timestamp,
        earned: false
    };
    
    // Transfer to sender instead of returning
    transfer::transfer(achievement, tx_context::sender(ctx));
} 
