#[test_only]
module 0x0::achievements_tests {
    use 0x0::achievements::{Self, Achievement};
    use sui::test_scenario::{Self as test, Scenario, next_tx, ctx};
    use std::string;

    // Test addresses
    const ADMIN: address = @0xAD;
    const USER: address = @0xB0B;

    fun create_test_achievement(scenario: &mut Scenario): Achievement {
        let title = string::utf8(b"Test Achievement");
        let description = string::utf8(b"Test Description");
        let category = string::utf8(b"gaming");
        let timestamp = 1234567890;

        achievements::create_achievement(
            title,
            description,
            category,
            timestamp,
            ctx(scenario)
        )
    }

    #[test]
    fun test_create_achievement() {
        let mut scenario = test::begin(ADMIN);
        
        let achievement = create_test_achievement(&mut scenario);
        
        assert!(achievements::get_title(&achievement) == string::utf8(b"Test Achievement"), 0);
        assert!(achievements::get_description(&achievement) == string::utf8(b"Test Description"), 1);
        assert!(achievements::get_category(&achievement) == string::utf8(b"gaming"), 2);
        assert!(achievements::get_timestamp(&achievement) == 1234567890, 3);
        assert!(!achievements::is_earned(&achievement), 4);

        transfer::public_transfer(achievement, ADMIN);
        test::end(scenario);
    }

    #[test]
    fun test_multiple_achievements() {
        let mut scenario = test::begin(ADMIN);
        
        let achievement1 = create_test_achievement(&mut scenario);
        
        next_tx(&mut scenario, USER);
        
        let title = string::utf8(b"Second Achievement");
        let description = string::utf8(b"Another Description");
        let category = string::utf8(b"sports");
        let timestamp = 1234567891;
        
        let achievement2 = achievements::create_achievement(
            title,
            description,
            category,
            timestamp,
            ctx(&mut scenario)
        );

        assert!(achievements::get_title(&achievement1) != achievements::get_title(&achievement2), 0);
        assert!(achievements::get_timestamp(&achievement1) != achievements::get_timestamp(&achievement2), 1);

        transfer::public_transfer(achievement1, ADMIN);
        transfer::public_transfer(achievement2, USER);
        test::end(scenario);
    }

    #[test]
    #[expected_failure(abort_code = 0x1, location = 0x0::achievements)]
    fun test_invalid_category() {
        let mut scenario = test::begin(ADMIN);
        
        let title = string::utf8(b"Invalid Achievement");
        let description = string::utf8(b"Test Description");
        let category = string::utf8(b"invalid_category");
        let timestamp = 1234567890;
        
        let achievement = achievements::create_achievement(
            title,
            description,
            category,
            timestamp,
            ctx(&mut scenario)
        );

        transfer::public_transfer(achievement, ADMIN);
        test::end(scenario);
    }
} 
