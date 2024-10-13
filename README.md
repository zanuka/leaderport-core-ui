# VueValkyrie

VueValkyrie is an open-source, real-time leaderboard system built with Vue 3 and Valkey (AWS's Redis fork). When complete, it will be a high-performance, scalable leaderboard designed for games and competitive applications. 

## Why Valkey?

I've selected Valkey primariluy for its speed, scalability, and real-time capabilities. 
Additional perks include: 

- **High Performance**: Valkey is designed for speed, making it ideal for real-time leaderboard updates and score retrievals.
- **Versatile Data Structures**: Valkey supports various data types including sorted sets, perfect for efficiently managing leaderboard rankings.
- **In-Memory Processing**: As an in-memory data store, Valkey provides extremely low latency for read and write operations, crucial for a responsive leaderboard.
- **Scalability**: Valkey can run in a cluster configuration, allowing the leaderboard system to scale as the user base grows.
- **Built-in Replication**: Valkey's replication features ensure high availability, preventing leaderboard downtime.
- **Lua Scripting Support**: Complex leaderboard operations can be optimized using Valkey's Lua scripting capabilities.
- **Active Community**: Being open-source with a vibrant community ensures ongoing development and support.
- **Compatibility**: As a fork of Redis, Valkey maintains compatibility with existing Redis clients and tools, easing integration and development.

## Why Vue?
I'm definitely partial to Vue since I've been building with it exclusively for the past 4 years, and think it's a great choice for this project. Some more specific benefits include: 

- **Best of Both Worlds**: Combines Angular's structure with React's flexibility.
- **Performance**: Lightweight with efficient rendering for fast, responsive leaderboards.
- **Reactive Data Binding**: Keeps UI in sync with data, perfect for real-time updates.
- **Composition API**: Improves code organization and reusability.
- **TypeScript Support**: Enhances code quality and developer productivity.
- **Vue DevTools**: Powerful debugging and performance tuning.
- **Scalability**: Supports both small and large-scale applications.
- **Easy Learning Curve**: Accessible for new contributors.
- **Strong Ecosystem**: Provides all tools needed for a full-featured SPA.
- **Go API Integration**: Ideal frontend partner for a Go backend.
- **Single-File Components**: Promotes clean, maintainable code structure.
- **Built-in Transition System**: Creates smooth animations for changing leaderboards.


## VueValkyrie User Experience and Technical Details

On the front-end, Vue-Valkyrie will offer a responsive Single Page Application (SPA) designed for optimal performance across both mobile and desktop browsers.

### Key Features

1. Real-time Leaderboard Updates
   - WebSocket integration for instant score changes
   - Smooth animations for rank changes

2. Responsive Design
   - Mobile-first approach with desktop enhancements
   - Adaptive layouts for various screen sizes

3. Player Profile Cards
   - Quick view of player stats and achievements
   - Social sharing capabilities

4. Multiple Leaderboard Views
   - Global rankings
   - Friend leaderboards
   - Time-based competitions (daily, weekly, monthly)

5. Search and Filters
   - Find specific players or filter by various criteria

### Front-end Architecture

- **Vue3 + Composition API**: Leveraging the latest Vue features for efficient, scalable component design.
- **Pinia**: State management solution for Vue, providing a smooth and reactive data flow.
- **PiniaColada**: additional layer that works on top of Pinia, specifically focusing on data fetching and caching. Inspired by React Query but designed to work seamlessly with Pinia and Vue 3. data flow with additional features like automatic persistence and simplified setup.
- **Vite**: Next-generation frontend tooling for fast development and optimized production builds.
- **TypeScript**: Enhancing code quality and developer experience with static typing.
- **Tailwind CSS**: Utility-first CSS framework for creating a responsive, customizable UI.
- **Cypress**: End-to-end testing framework for robust, reliable automated testing of web applications. Cypress provides a powerful set of features for writing, running, and debugging tests that simulate real user interactions, ensuring the application works correctly from the user's perspective.
- **Vitest**: Fast and lightweight unit testing framework for Vite projects. We'll use it for unit and component tests due to its speed, ESM support, and seamless integration with the Vue ecosystem, allowing for efficient and effective testing of Vue components and application logic.


### API Integration

The Vue app communicates with the Go backend using a robust API integration strategy:

1. **Axios for HTTP Requests**: 
   - Custom instance with base URL and default headers
   - Request/response interceptors for consistent error handling and authentication

   ```typescript
   // api/axios.ts
   import axios from 'axios';

   const api = axios.create({
     baseURL: process.env.VUE_APP_API_URL,
     headers: {
       'Content-Type': 'application/json',
     },
   });

   api.interceptors.request.use(/* ... */);
   api.interceptors.response.use(/* ... */);

   export default api;
   ```

2. **API Service Layer**:
   - Abstraction for API calls, making them easily reusable across the app

   ```typescript
   // services/leaderboardService.ts
   import api from '@/api/axios';

   export const getLeaderboard = async (params) => {
     const response = await api.get('/leaderboard', { params });
     return response.data;
   };

   export const submitScore = async (score) => {
     const response = await api.post('/scores', score);
     return response.data;
   };
   ```

3. **WebSocket Integration**:
   - Real-time updates using native WebSocket API or a library like `socket.io-client`

### State Management with Pinia

[Pinia](https://github.com/vuejs/pinia) is the _intuitive, type safe and flexible Store for Vue_. Our leaderboard app will use a Pinia store to manage the application state, handling data fetching, caching, and real-time updates

#### Pinia Benefits

1. Real-time Updates: Pinia allows for seamless integration of WebSocket data, enabling instant leaderboard updates without page refreshes, enhancing the real-time feel of the application.

2. Caching and Performance: Pinia can cache leaderboard data locally, reducing unnecessary API calls and improving load times, especially beneficial for frequently accessed leaderboard information.

3. Consistent State Across Components: Ensures that all components (e.g., main leaderboard, player profiles, mini-leaderboards) display consistent data, preventing discrepancies in displayed scores or rankings.

4. Complex Filtering and Sorting: Facilitates efficient client-side filtering and sorting of leaderboard data, allowing for quick toggles between different views (e.g., daily, weekly, all-time) without server requests.

5. Optimistic UI Updates: Enables immediate UI updates for user actions (like submitting a new score) before server confirmation, providing a responsive feel while handling asynchronous operations in the background.

6. These benefits are crucial for the user experience as they contribute to a smooth, responsive, and interactive leaderboard that feels dynamic and engaging, essential for maintaining user interest in a competitive gaming context.

#### Bonus Points :joystick: Pinia Colada integration!!!

By leveraging [Pinia Colada](https://github.com/posva/pinia-colada), we can get a powerful data fetching layer that integrates well with Pinia and Vue 3, providing a smooth and reactive experience for your leaderboard SPA. Bonus :trophy:

```typscript
<script lang="ts" setup>
import { useQuery, useMutation, useQueryCache } from '@pinia/colada'
import { getLeaderboard, submitScore } from '~/api/leaderboard'

const { data: leaderboard, isLoading } = useQuery({
  key: ['leaderboard'],
  query: () => getLeaderboard(),
})

const caches = useQueryCache()

const { mutate: updateScore } = useMutation({
  mutation: submitScore,
  onSettled() {
    // Invalidate and refetch leaderboard after score update
    caches.invalidateQueries({ key: ['leaderboard'], exact: true })
  },
})
</script>

<template>
  <div>
    <LeaderboardDisplay :data="leaderboard" :is-loading="isLoading" />
    <ScoreSubmissionForm @submit="updateScore" />
  </div>
</template>
```

This setup allows for efficient data fetching, automatic updates after score submissions, and clean separation of concerns in your leaderboard component.

#### Pinia Colada Benefits :tropical_drink:

1. Automatic Caching: Pinia Colada offers smart client-side caching with request deduplication. This is particularly useful for a leaderboard where you might need to frequently fetch updated scores without overwhelming your API.

2. Async State Management: It handles async state seamlessly, which is crucial for real-time leaderboard updates. This can help in managing loading states and error handling more efficiently.

3. TypeScript Support: With full TypeScript support, you can ensure type safety across your leaderboard components, reducing potential bugs and improving developer experience.

4. SSR Support: If you decide to implement server-side rendering for improved initial load times, Pinia Colada's SSR support will be beneficial.

5. Query Invalidation: The ability to invalidate queries easily (as shown in the example with caches.invalidateQueries) is perfect for updating the leaderboard when new scores are submitted.

Here's a quick example of how you might use Pinia Colada in your leaderboard component:


## Initial Prototype Features
We will focus on the following features for prototype phase 1 
- Real-time updates using WebSockets
- Efficient data management with Valkey
- Responsive Vue 3 frontend with TypeScript
- Scalable Go backend using Huma
- Easy deployment on AWS infrastructure

The end result should be useful for game developers, hobbyists, and projects that require high-performance web applications.

## Backend (Go API)

1. Create a Go API that handles game score submissions and leaderboard queries.
2. Use Valkey to store and retrieve player scores and rankings.

### Leaderboard Logic
- Implement a sorted set in Valkey to maintain the leaderboard.
- Use Valkey's atomic operations for accurate, concurrent score updates.

### Caching
- Cache frequently accessed leaderboard segments in Valkey for fast retrieval.

### Real-time Updates
- Implement a WebSocket connection to push leaderboard changes to connected clients.

### Rate Limiting
- Use Valkey to implement rate limiting on score submissions to prevent cheating.

## Frontend (Vue SPA)

- Create a simple interface to display the leaderboard and allow score submissions.
- Show real-time updates as scores change.

## Basic Implementation Outline

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

 


This prototype would demonstrate:

1. Valkey's high-speed data operations for real-time updates
2. Scalability for handling many concurrent users and score submissions
3. Caching capabilities for fast leaderboard retrieval
4. Use of Valkey's data structures (sorted sets) for efficient ranking
5. Rate limiting implementation to showcase Valkey's utility in API protection

You could expand this prototype with features like:

- Player profiles
- Multiple leaderboards
- Time-based competitions

These additional features would further explore Valkey's capabilities and showcase its versatility in game development scenarios.

## Project Overview
This project is an open-source prototype of a real-time leaderboard system for mobile games. It demonstrates the capabilities of Valkey (AWS's fork of Redis) in a high-performance, scalable application.

## Tech Stack
- Frontend:
  - Vue 3
  - TypeScript
  - Pinia (for state management)
  - Vite (for build tooling)
- Backend:
  - Go
  - Huma (for API development)
- Database:
  - Valkey (AWS's Redis fork)
- Cloud Infrastructure:
  - AWS (EC2 or ECS for hosting)
  - Amazon ElastiCache for Valkey
  - S3 (for static asset hosting)
- CI/CD:
  - GitHub Actions
- Additional:
  - WebSocket (for real-time updates)
  - Docker (for containerization)

## Huma Integration with Go API and Valkey

Huma, a modern framework for building Go APIs, can be seamlessly integrated with Valkey to create a powerful and efficient backend for Vue-Valkyrie:

1. API Structure:
   Huma provides a clean, declarative way to define your API endpoints. For Vue-Valkyrie, you can create endpoints for submitting scores, fetching leaderboards, and player rankings.

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
   While Huma primarily focuses on REST APIs, you can still use it alongside a WebSocket server for real-time updates. Use Valkey's Pub/Sub feature to coordinate updates:

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
   Use Huma's configuration management to set up your Valkey connection:

   ```go
   func NewLeaderboardAPI(config *huma.Config) (*LeaderboardAPI, error) {
       valkeyClient := redis.NewClient(&redis.Options{
           Addr: config.Get("valkey_address"),
           // other options...
       })
       return &LeaderboardAPI{valkey: valkeyClient}, nil
   }
   ```

By leveraging Huma's features alongside Valkey, Vue-Valkyrie achieves a clean, efficient, and scalable backend architecture that can handle real-time leaderboard operations with ease.


### Testing Strategy

1. **Unit and Component Tests**:
   - Vitest for fast, ESM-native unit testing
   - Vue Testing Library for component testing with a focus on user interactions

   ```typescript
   // tests/components/LeaderboardItem.test.ts
   import { render, screen } from '@testing-library/vue';
   import LeaderboardItem from '@/components/LeaderboardItem.vue';

   test('renders player name and score', () => {
     render(LeaderboardItem, { props: { player: { name: 'John', score: 1000 } } });
     expect(screen.getByText('John')).toBeInTheDocument();
     expect(screen.getByText('1000')).toBeInTheDocument();
   });
   ```

2. **End-to-End Tests**:
   - Cypress for comprehensive E2E testing, simulating real user scenarios

   ```javascript
   // cypress/integration/leaderboard.spec.js
   describe('Leaderboard', () => {
     it('displays top players', () => {
       cy.visit('/leaderboard');
       cy.get('[data-testid="leaderboard-item"]').should('have.length', 10);
       cy.get('[data-testid="leaderboard-item"]').first().should('contain', 'Rank #1');
     });
   });
   ```

### Error Handling and Logging with Rollbar

By leveraging Rollbar, Vue-Valkyrie can maintain a high-quality user experience, quickly address issues, and continuously improve the application's stability and performance. 

Specifics:

1. **Real-time Error Monitoring**: Rollbar can capture and report errors in real-time, allowing for quick identification and resolution of issues in the Vue-Valkyrie frontend.

2. **Detailed Error Context**: Rollbar provides rich context for each error, including stack traces, request parameters, and user information, making debugging more efficient.

3. **User Impact Analysis**: With Rollbar's user tracking, we can understand how errors affect specific users or groups, prioritizing fixes based on impact.

4. **Performance Monitoring**: Beyond error tracking, Rollbar can help monitor application performance, identifying slow-loading components or API calls.

5. **Customizable Alerts**: Set up custom alert rules to notify the development team about critical issues immediately.

6. **Error Grouping and Deduplication**: Rollbar automatically groups similar errors, reducing noise and helping focus on unique issues.

7. **Integration with Development Workflow**: Rollbar can integrate with issue trackers and communication tools, streamlining the bug-fixing process.

8. **Release Tracking**: Monitor the impact of new releases on error rates, helping to quickly identify and rollback problematic deployments.


## Contributors

Vue-Valkyrie welcomes contributions from the open-source gaming community! This project aims to provide a robust, scalable leaderboard solution that game developers can easily integrate into their projects.

### How You Can Contribute

1. **Feature Development**: Add new features or enhance existing ones.
2. **Bug Fixes**: Help identify and resolve issues.
3. **Documentation**: Improve our docs to help others integrate Vue-Valkyrie.
4. **Testing**: Expand our test coverage and improve test scenarios.
5. **Performance Optimization**: Help make Vue-Valkyrie even faster and more efficient.

### Benefits for the Gaming Community

- **Open-Source Advantage**: Free, customizable leaderboard solution.
- **Learning Opportunity**: Great project for developers to learn modern web technologies.
- **Community-Driven**: Features and improvements guided by real-world needs.
- **Integration Ready**: Easily adaptable for various game types and platforms.


## Author

Vue-Valkyrie was created and is maintained by [zanuka](https://github.com/zanuka).

For inquiries or collaborations, please reach out via:
- GitHub: [@zanuka](https://github.com/zanuka)
- LinkedIn: [Mike Delucchi](https://www.linkedin.com/in/zanuka)
- Email: dev@zanuka.io

Your feedback and contributions are always welcome!


