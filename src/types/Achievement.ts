export interface Achievement {
  id: string;
  title: string;
  description: string;
  timestamp: number;
  category: "gaming" | "sports" | "other";
  metadata?: Record<string, any>;
}
