import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chat = sqliteTable("chats", {
  id: integer("id").primaryKey(),
  message: text("message").notNull(),
  sender: text("sender").notNull(),
  receiver: text("receiver").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export type Chat = typeof chat.$inferSelect;
export type NewChat = typeof chat.$inferInsert;
