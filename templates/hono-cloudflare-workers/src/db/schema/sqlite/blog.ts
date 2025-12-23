import { InferSelectModel } from "drizzle-orm";
import * as s from "drizzle-orm/sqlite-core";

export const blogTable = s.sqliteTable(
  "blogs",
  {
    id: s.integer("id").primaryKey({ autoIncrement: true }),
    uuid: s.text("uuid").unique().notNull(),
    title: s.text("title").notNull(),
    keywords: s.text("keywords", { mode: "json" }).$type<string[]>().notNull(),
    content: s.text("content"),
    status: s
      .text("status", { enum: ["ACTIVE", "DRAFT"] })
      .notNull()
      .default("ACTIVE"),
    createdAt: s.integer("createdAt").notNull(),
    updatedAt: s.integer("updatedAt").notNull(),
    deletedAt: s.integer("deletedAt"),
  },
  (table) => ({})
);
