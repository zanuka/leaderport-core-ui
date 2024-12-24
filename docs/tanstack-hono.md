## TanStack + Redis + Hono Integration

Combining TanStack with Upstash/Redis and Hono creates a powerful foundation for the LeaderPort real-time leaderboard system. Here's how these technologies work together:

### 1. Real-time Score Synchronization
```typescript
import { createQuery, createMutation } from '@tanstack/vue-query'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

// Real-time score management
const scoreQuery = createQuery({
  queryKey: ['playerScore'],
  queryFn: async () => {
    const score = await redis.get(`player:${playerId}:score`)
    return Number(score) || 0
  },
  staleTime: 1000,
  cacheTime: 5000
})

// Optimistic updates with Redis
const scoreMutation = createMutation({
  mutationFn: async (newScore: number) => {
    await redis.set(`player:${playerId}:score`, newScore)
    await redis.zadd('leaderboard', { score: newScore, member: playerId })
    return newScore
  },
  onMutate: async (newScore) => {
    await queryClient.cancelQueries(['playerScore'])
    const previous = queryClient.getQueryData(['playerScore'])
    queryClient.setQueryData(['playerScore'], newScore)
    return { previous }
  }
})
```

### 2. Hono Server Integration
```typescript
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Redis } from '@upstash/redis'

const app = new Hono()
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

// Middleware setup
app.use(cors())

// RESTful endpoints for TanStack Query
app.get('/api/leaderboard', async (c) => {
  // Get top 100 players using Redis Sorted Set
  const leaderboard = await redis.zrange('leaderboard', 0, 99, {
    withScores: true,
    rev: true
  })
  return c.json(leaderboard)
})

// WebSocket support for real-time updates
app.get('/ws', async (c) => {
  const ws = await c.upgrade()
  
  // Subscribe to Redis pub/sub for real-time updates
  const subscriber = redis.duplicate()
  await subscriber.subscribe('leaderboard-updates', (message) => {
    ws.send(JSON.stringify(message))
  })
})
```

### 3. Efficient Data Management
```typescript
import { Store } from '@tanstack/store'
import { useVirtualizer } from '@tanstack/vue-virtual'

// Combine TanStack Store with Redis data
const leaderboardStore = new Store({
  state: {
    entries: [],
    lastUpdate: null
  },
  onUpdate: async (store) => {
    // Batch update Redis sorted set
    const pipeline = redis.pipeline()
    store.entries.forEach(entry => {
      pipeline.zadd('leaderboard', { score: entry.score, member: entry.playerId })
    })
    await pipeline.exec()
  }
})

// Virtual scrolling for large leaderboards
const virtualizer = useVirtualizer({
  count: leaderboardStore.state.entries.length,
  getScrollElement: () => scrollElementRef.value,
  estimateSize: () => 50,
  overscan: 5
})
```

### Key Benefits of This Integration

1. **Performance Optimization**
   - TanStack Query's caching aligns with in-memory performance ( redis )
   - Hono's lightweight design minimizes overhead
   - Virtual scrolling handles large datasets efficiently

2. **Real-time Capabilities**
   - WebSocket support through Hono
   - TanStack Query's real-time updates
   - Redis's high-performance data storage

3. **Developer Experience**
   - Type safety across the stack
   - Consistent API patterns
   - Built-in development tools

### Implementation Patterns

1. **Score Updates**
```typescript
// Hono endpoint
app.post('/api/score', async (c) => {
  const { score, playerId } = await c.req.json()
  
  // Update Redis
  const pipeline = redis.pipeline()
  pipeline.set(`player:${playerId}:score`, score)
  pipeline.zadd('leaderboard', { score, member: playerId })
  await pipeline.exec()
  
  // Publish update
  await redis.publish('leaderboard-updates', JSON.stringify({
    type: 'SCORE_UPDATE',
    playerId,
    score
  }))
  
  return c.json({ success: true })
})

// Frontend handling
const scoreUpdate = createMutation({
  mutationFn: async (score: number) => {
    const response = await fetch('/api/score', {
      method: 'POST',
      body: JSON.stringify({ score })
    })
    return response.json()
  }
})
```

2. **Real-time Leaderboard**
```typescript
// WebSocket integration with TanStack Query
const leaderboardQuery = createQuery({
  queryKey: ['leaderboard'],
  queryFn: () => fetch('/api/leaderboard').then(r => r.json()),
  refetchInterval: false, // Use WebSocket instead
})

// WebSocket connection
const ws = new WebSocket('ws://localhost:3000/ws')
ws.onmessage = (event) => {
  const update = JSON.parse(event.data)
  queryClient.setQueryData(['leaderboard'], (old) => ({
    ...old,
    ...update
  }))
}
```

### Performance Benefits

1. **Redis Advantages**
   - In-memory data storage with persistence
   - Atomic operations for score updates
   - Built-in pub/sub for real-time updates
   - Sorted sets perfect for leaderboards

2. **TanStack Features**
   - Smart caching strategies
   - Automatic background updates
   - Optimistic UI updates

3. **Hono Benefits**
   - Lightweight and fast
   - Built-in WebSocket support
   - TypeScript-first design

For more information on TanStack implementation, see [TanStack Details](./tanstack-details.md).

For backend setup details, see [Backend Setup Guide](./backend-setup.md).

For detailed implementation guidelines and best practices, refer to:
- [TanStack Documentation](https://tanstack.com/docs/latest)
- [Hono Documentation](https://hono.dev)
- [Upstash Redis Documentation](https://docs.upstash.com/redis)
