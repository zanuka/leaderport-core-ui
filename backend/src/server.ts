import { Hono } from "hono";
import { cache } from "hono/cache";
import { cors } from "hono/cors";
import { jwt } from "hono/jwt";
import { logger } from "hono/logger";

const app = new Hono();

// Middleware
app.use("*", logger());
app.use("/api/*", cors());
app.use("/api/*", jwt({ secret: process.env.JWT_SECRET }));
app.use(
  "/api/leaderboard",
  cache({ cacheName: "leaderboard", cacheControl: "max-age=60" })
);

// ... existing routes ...

// WebSocket handling
let wss: Set<WebSocket> = new Set();

export default {
  port: 3000,
  fetch: app.fetch,
  websocket: {
    message(ws: WebSocket, message: string) {
      // Broadcast updates to all connected clients
      wss.forEach((client) => client.send(message));
    },
    open(ws: WebSocket) {
      wss.add(ws);
    },
    close(ws: WebSocket) {
      wss.delete(ws);
    },
  },
};
