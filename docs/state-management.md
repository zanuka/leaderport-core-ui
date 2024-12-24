## Front-end State Management Options

### 1. Pinia (Vue-specific)
[Current Pinia section remains as is, but labeled as one option]

### 2. TanStack Store + Query
TanStack provides a powerful combination of state management tools that work well with both Vue and Hono:

```typescript
import { Store } from '@tanstack/store'
import { createQuery } from '@tanstack/vue-query'

// Global state management
const leaderboardStore = new Store({
  state: {
    scores: [],
    filters: { timeRange: '24h', limit: 100 },
    lastUpdate: null
  }
})

// Server state management
const leaderboardQuery = createQuery({
  queryKey: ['leaderboard', leaderboardStore.state.filters],
  queryFn: () => fetchLeaderboard(leaderboardStore.state.filters),
  staleTime: 1000,
  cacheTime: 5000
})

// Optimistic updates
const scoreUpdate = createMutation({
  mutationFn: updateScore,
  onMutate: async (newScore) => {
    await queryClient.cancelQueries(['leaderboard'])
    const previous = queryClient.getQueryData(['leaderboard'])
    queryClient.setQueryData(['leaderboard'], old => ({
      ...old,
      scores: [...old.scores, newScore]
    }))
    return { previous }
  }
})
```

Benefits:
1. Separation of Server/Client State:
   - TanStack Query handles server state
   - TanStack Store manages UI state
   - Clear boundaries between data types

2. Framework Agnostic:
   - Works with both Vue and Hono
   - Consistent patterns across stack
   - Easy to switch frameworks

3. Performance Features:
   - Automatic background updates
   - Smart caching strategies
   - Optimistic UI updates

### 3. Signals (Framework Agnostic)
Using signals (via @preact/signals-core or similar) provides a lightweight approach:

```typescript
import { signal, computed, effect } from '@preact/signals-core'

// Core state
const scores = signal([])
const timeRange = signal('24h')

// Computed values
const topPlayers = computed(() => 
  scores.value.slice(0, 10)
)

// Effects for sync
effect(() => {
  websocket.send(JSON.stringify({
    type: 'SUBSCRIBE',
    timeRange: timeRange.value
  }))
})
```

Benefits:
1. Lightweight Implementation
2. Fine-grained Reactivity
3. Framework Independent

### 4. Server-Side State Considerations

#### Hono Context State
Hono provides built-in state management for server-side concerns:

```typescript
import { Hono } from 'hono'
import { cache } from './cache'

const app = new Hono()

// Global state middleware
app.use('*', async (c, next) => {
  c.set('cache', cache)
  await next()
})

// State access in routes
app.get('/api/leaderboard', async (c) => {
  const cache = c.get('cache')
  return c.json(await cache.get('leaderboard'))
})
```

### Implementation Strategy

Consider a hybrid approach:

1. **Server State:**
   - TanStack Query for data fetching
   - Upstash Redis for distributed state
   - Hono context for request state

2. **Client State:**
   - TanStack Store for global UI state
   - Signals for component state 
   - Optional Pinia for Vue-specific features

3. **Real-time Updates:**
   - WebSocket for live data
   - TanStack Query for polling
   - Upstash Redis for pub/sub

### Research Tasks
- [ ] Benchmark different combinations:
  - [ ] Pinia + WebSocket
  - [ ] TanStack (Store + Query)
  - [ ] Signals + TanStack Query
- [ ] Test scaling characteristics
- [ ] Evaluate developer experience
- [ ] Document trade-offs

### Decision Matrix

| Solution          | Pros                                | Cons                               |
|------------------|-------------------------------------|-----------------------------------|
| Pinia           | Vue integration, mature             | Vue-specific, larger bundle       |
| TanStack        | Full featured, framework agnostic   | Learning curve, complexity        |
| Signals         | Lightweight, performant             | Limited features, newer           |
| Hybrid          | Best of all, flexible              | Setup complexity, coordination    |

For detailed implementation examples

For TanStack-specific implementation details, see [TanStack Details](./tanstack-details.md).

For integration examples with TanStack, Upstash Redis and Hono, see [TanStack Redis Hono Integration](./tanstack-hono.md).
