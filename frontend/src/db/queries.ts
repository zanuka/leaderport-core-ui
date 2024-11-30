import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { players, scores } from "./schema";

export const leaderboardQueries = {
  async getTopScores(limit = 10) {
    return db
      .select()
      .from(scores)
      .innerJoin(players, eq(scores.playerId, players.id))
      .orderBy(desc(scores.score))
      .limit(limit);
  },

  async getPlayerStats(playerId: string) {
    const stats = await db
      .select({
        totalGames: sql<number>`count(*)`,
        avgScore: sql<number>`avg(${scores.score})`,
        highScore: sql<number>`max(${scores.score})`,
      })
      .from(scores)
      .where(eq(scores.playerId, playerId))
      .groupBy(scores.playerId);

    return stats[0];
  },

  async getTimeRangeScores(startDate: Date, endDate: Date) {
    return db
      .select()
      .from(scores)
      .where(
        and(
          sql`${scores.createdAt} >= ${startDate}`,
          sql`${scores.createdAt} <= ${endDate}`
        )
      )
      .orderBy(desc(scores.score));
  },
};
