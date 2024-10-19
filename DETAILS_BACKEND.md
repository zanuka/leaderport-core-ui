# Back-end Details

This is a rough draft of how the back-end setup could be designed.  

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

Huma, a modern framework for building Go APIs, can be seamlessly integrated with Valkey to create a powerful and efficient back end for Valkran:

1. API Structure:
   Huma provides a clean, declarative way to define our API endpoints. For Valkran, the plan is to create endpoints for submitting scores, fetching leaderboards, and player rankings.

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

By leveraging Huma's features alongside Valkey, Valkran achieves a clean, efficient, and scalable back-end architecture that can handle real-time leaderboard operations with ease.

## Queue and Process Tasks with Asynq

We'll leverage [Asyncq](https://github.com/hibiken/asynq) as the distributed task queue to spread the work of the leaderboard across multiple machines. 

1. Distributed Task Queue: Asynq provides a simple, reliable, and efficient distributed task queue system, which is perfect for managing background jobs in a scalable application like Valkran.

2. Redis Integration: Asynq uses Redis as its backend, which aligns well with Valkey's Redis-based architecture. This means you can potentially use the same Redis instance for both Valkey and Asynq, simplifying your infrastructure.

3. Autoscaling Support: Asynq's design supports horizontal scaling, which complements Valkey's autoscaling capabilities. You can easily add more worker servers to process tasks as your load increases.

4. Background Processing: For operations that might be too time-consuming for immediate processing (like complex leaderboard calculations or data aggregations), you can offload these to Asynq tasks, ensuring responsive API endpoints.

5. Scheduled Tasks: Asynq supports scheduling tasks for future execution, which could be useful for features like daily leaderboard resets or periodic data cleanup jobs.

6. Error Handling and Retries: Asynq provides built-in support for task retries and error handling, improving the reliability of your background operations.

7. Monitoring and Observability: Asynq offers a web UI and CLI tools for monitoring and managing tasks, which can be invaluable for debugging and maintaining your system.

### Asynq Integration Examples



```go
// main.go
package main

import (
	"context"
	"log"

	"github.com/danielgtaylor/huma/v2"
	"github.com/go-redis/redis/v8"
	"github.com/hibiken/asynq"
)

func main() {
	// Initialize Valkey client
	valkeyClient := redis.NewClient(&redis.Options{
		Addr: "your-valkey-instance:6379",
	})

	// Initialize Asynq client
	asynqClient := asynq.NewClient(asynq.RedisClientOpt{
		Addr: "your-valkey-instance:6379",
	})
	defer asynqClient.Close()

	// Initialize Asynq server
	asynqServer := asynq.NewServer(
		asynq.RedisClientOpt{Addr: "your-valkey-instance:6379"},
		asynq.Config{Concurrency: 10},
	)

	// Start Asynq worker in a separate goroutine
	go func() {
		mux := asynq.NewServeMux()
		mux.HandleFunc("update_leaderboard", handleUpdateLeaderboard)
		if err := asynqServer.Run(mux); err != nil {
			log.Fatal(err)
		}
	}()

	// Initialize LeaderboardAPI
	api := NewLeaderboardAPI(valkeyClient, asynqClient)

	// Set up Huma API
	router := huma.New()
	router.Handle("POST", "/submit-score", api.SubmitScore)
	router.Handle("GET", "/leaderboard", api.GetLeaderboard)

	// Start the server
	log.Fatal(router.Listen(":8080"))
}

func handleUpdateLeaderboard(ctx context.Context, t *asynq.Task) error {
	// Implement leaderboard update logic here
	// This will be called asynchronously by Asynq
	return nil
}
```
Here's an example of how the LeaderboardAPI would be implemented with Asynq 

```go
leaderboard_api.go
package main

import (
	"context"
	"encoding/json"

	"github.com/danielgtaylor/huma/v2"
	"github.com/go-redis/redis/v8"
	"github.com/hibiken/asynq"
)

type LeaderboardAPI struct {
	valkey *redis.Client
	asynq  *asynq.Client
}

func NewLeaderboardAPI(valkey *redis.Client, asynq *asynq.Client) *LeaderboardAPI {
	return &LeaderboardAPI{
		valkey: valkey,
		asynq:  asynq,
	}
}

type SubmitScoreRequest struct {
	PlayerID string `json:"player_id"`
	Score    int    `json:"score"`
}

func (api *LeaderboardAPI) SubmitScore(ctx context.Context, req SubmitScoreRequest) error {
	// Update score in Valkey
	err := api.valkey.ZAdd(ctx, "leaderboard", &redis.Z{
		Score:  float64(req.Score),
		Member: req.PlayerID,
	}).Err()
	if err != nil {
		return huma.Error500InternalServerError("Failed to update score", err)
	}

	// Enqueue a task to update the leaderboard asynchronously
	task := asynq.NewTask("update_leaderboard", nil)
	_, err = api.asynq.Enqueue(task)
	if err != nil {
		return huma.Error500InternalServerError("Failed to enqueue leaderboard update", err)
	}

	return nil
}

type LeaderboardEntry struct {
	PlayerID string  `json:"player_id"`
	Score    float64 `json:"score"`
}

func (api *LeaderboardAPI) GetLeaderboard(ctx context.Context) ([]LeaderboardEntry, error) {
	// Fetch top 10 players from Valkey
	result, err := api.valkey.ZRevRangeWithScores(ctx, "leaderboard", 0, 9).Result()
	if err != nil {
		return nil, huma.Error500InternalServerError("Failed to fetch leaderboard", err)
	}

	leaderboard := make([]LeaderboardEntry, len(result))
	for i, z := range result {
		leaderboard[i] = LeaderboardEntry{
			PlayerID: z.Member.(string),
			Score:    z.Score,
		}
	}

	return leaderboard, nil
}

```
Then implement the asynchronous leaderboard update handler

```go
// leaderboard_worker.go
package main

import (
	"context"
	"log"

	"github.com/go-redis/redis/v8"
	"github.com/hibiken/asynq"
)

func handleUpdateLeaderboard(ctx context.Context, t *asynq.Task) error {
	// Initialize Valkey client
	// In a real-world scenario, you'd want to reuse the client or use dependency injection
	valkey := redis.NewClient(&redis.Options{
		Addr: "your-valkey-instance:6379",
	})

	// Perform complex leaderboard calculations
	// For example, update global rankings, calculate percentiles, etc.
	err := updateGlobalRankings(ctx, valkey)
	if err != nil {
		log.Printf("Error updating global rankings: %v", err)
		return err
	}

	return nil
}

func updateGlobalRankings(ctx context.Context, valkey *redis.Client) error {
	// Implement your complex leaderboard logic here
	// This is just a placeholder example
	_, err := valkey.ZRangeWithScores(ctx, "leaderboard", 0, -1).Result()
	if err != nil {
		return err
	}

	// Process the results, update global rankings, etc.
	// ...

	return nil
}
```

## Asyncq : Valkey : Go : Huma :: Overview

This setup integrates Asynq with your Valkey-based Go backend using the Huma framework. Here's a breakdown of what's happening:

1. In `main.go`, we set up both the Asynq client (for enqueueing tasks) and server (for processing tasks).
2. The `LeaderboardAPI` in `leaderboard_api.go` will use Valkey for immediate score updates and Asynq to enqueue background tasks for more complex leaderboard updates.
3. The `handleUpdateLeaderboard` function in `leaderboard_worker.go` is where you'd implement your complex leaderboard update logic, which runs asynchronously.

This approach will allow us to keep our API endpoints responsive by offloading time-consuming operations to background tasks, while still leveraging Valkey's fast read/write capabilities for immediate updates and queries.

### notes on enqueing tasks

Enqueuing tasks is useful for several reasons:

1. It allows you to defer time-consuming operations, keeping your API responsive.
2. It enables better load distribution and scaling of your application.
3. It provides a way to handle background jobs that don't need to be processed immediately.
4. In the context of the leaderboard application, enqueuing the "update_leaderboard" task allows the API to quickly respond to score submissions while the more complex task of updating the entire leaderboard happens asynchronously in the background.

### additional things we will want to do
- Handle errors appropriately
- Implement proper logging
- add monitoring for your Asynq tasks for smooth backend operation

