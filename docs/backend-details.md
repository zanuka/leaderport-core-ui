# Back-end Details (Hono + Bun)

## Architecture Overview

The backend is built using:
- **Hono**: For HTTP routing, streaming responses, and JSX rendering
- **Bun**: As the JavaScript runtime for superior performance
- **Drizzle ORM**: For type-safe database operations
- **Valkey**: For leaderboard-specific operations
- **OpenAI**: For natural language leaderboard interactions
- **WebSocket**: For real-time updates

### Core Components

1. **Hono Server**:
   - Server-side rendered routes with JSX support
   - RESTful API endpoints
   - Streaming GPT-4 integration for natural language queries
   - Middleware stack:
     - CORS handling
     - JWT authentication
     - Request logging
     - Response caching
   - WebSocket support for real-time updates

2. **Database Layer**:
   - Drizzle ORM for type-safe database operations
   - Complex leaderboard queries:
     - Top scores retrieval
     - Player statistics
     - Time-range based queries
   - Optimized query performance with proper indexing

3. **Real-time Updates**:
   - WebSocket server implementation
   - Broadcast system for score updates
   - Connection management for multiple clients

4. **API Integration**:
   - OpenAI GPT-4 streaming for natural language queries
   - Server-Sent Events (SSE) for real-time responses
   - Redis integration through Valkey for leaderboard operations

### Implementation Examples

Key implementation files are organized as follows:

```
src/server.ts
// Main server configuration with Hono
// Includes route definitions, middleware setup, and WebSocket handling
```

```
db/queries.ts
// Complex database queries using Drizzle ORM
// Includes leaderboard operations and player statistics
```

```
db/schema.ts
// Database schema definitions
// Includes tables for scores, players, and game types
```


For frontend integration details, see [Frontend Details](./frontend-details.md).

For state management options, see [State Management Guide](./state-management.md).

