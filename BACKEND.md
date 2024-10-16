# Back-end Design

## Go API Details

1. Create a Go API that handles game score submissions and leaderboard queries.
2. Use Valkey to store and retrieve player scores and rankings.

### Valkey Implementation Example in Go

```go
import (
    "github.com/go-redis/redis/v8"
    // ... other imports
)

func main() {
    // Initialize Valkey client
    valkey := redis.NewClient(&redis.Options{
        Addr: "your-valkey-instance:6379",
    })

    // Set up API routes
    http.HandleFunc("/submit-score", submitScoreHandler)
    http.HandleFunc("/get-leaderboard", getLeaderboardHandler)
    
    // ... WebSocket setup for real-time updates

    http.ListenAndServe(":8080", nil)
}

func submitScoreHandler(w http.ResponseWriter, r *http.Request) {
    // Parse player ID and score from request
    // Use Valkey to update score and leaderboard
    // Implement rate limiting
}

func getLeaderboardHandler(w http.ResponseWriter, r *http.Request) {
    // Retrieve leaderboard data from Valkey
    // Return JSON response
}

// ... WebSocket handler for pushing updates
```

### Huma Integration with Go API and Valkey

Huma, a modern framework for building Go APIs, can be seamlessly integrated with Valkey to create a powerful and efficient back end for VueValkyrie:

1. API Structure:
   Huma provides a clean, declarative way to define our API endpoints. For VueValkyrie, the plan is to create endpoints for submitting scores, fetching leaderboards, and player rankings.

   ```go
   type LeaderboardAPI struct {
       valkey *redis.Client
   }

   func (api *LeaderboardAPI) SubmitScore(ctx context.Context, req struct{
       PlayerID string `json:"player_id"`
       Score    int    `json:"score"`
   }) error {
       // Use Valkey to update score
       return api.valkey.ZAdd(ctx, "leaderboard", &redis.Z{
           Score:  float64(req.Score),
           Member: req.PlayerID,
       }).Err()
   }

   func (api *LeaderboardAPI) GetLeaderboard(ctx context.Context) ([]Player, error) {
       // Fetch top players from Valkey
       // ...
   }
   ```

2. Middleware and Validation:
   Utilize Huma's middleware for rate limiting and input validation, integrating with Valkey for tracking request counts:

   ```go
   func RateLimitMiddleware(valkey *redis.Client) huma.Middleware {
       return func(next http.HandlerFunc) http.HandlerFunc {
           return func(w http.ResponseWriter, r *http.Request) {
               // Use Valkey to check and update rate limit
               // ...
           }
       }
   }
   ```

3. WebSocket Integration:
   While Huma primarily focuses on REST APIs, we can still use it alongside a WebSocket server for real-time updates. Use Valkey's Pub/Sub feature to coordinate updates:

   ```go
   func (api *LeaderboardAPI) PublishUpdate(ctx context.Context, update LeaderboardUpdate) error {
       return api.valkey.Publish(ctx, "leaderboard_updates", update).Err()
   }
   ```

4. Error Handling:
   Leverage Huma's error handling capabilities while working with Valkey:

   ```go
   func (api *LeaderboardAPI) GetPlayerRank(ctx context.Context, playerID string) (int64, error) {
       rank, err := api.valkey.ZRank(ctx, "leaderboard", playerID).Result()
       if err == redis.Nil {
           return 0, huma.Error404NotFound("Player not found")
       }
       return rank, err
   }
   ```

5. Configuration and Dependency Injection:
   Use Huma's configuration management to set up our Valkey connection:

   ```go
   func NewLeaderboardAPI(config *huma.Config) (*LeaderboardAPI, error) {
       valkeyClient := redis.NewClient(&redis.Options{
           Addr: config.Get("valkey_address"),
           // other options...
       })
       return &LeaderboardAPI{valkey: valkeyClient}, nil
   }
   ```

By leveraging Huma's features alongside Valkey, VueValkyrie achieves a clean, efficient, and scalable back-end architecture that can handle real-time leaderboard operations with ease.
