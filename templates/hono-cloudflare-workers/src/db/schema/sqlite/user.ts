import * as s from "drizzle-orm/sqlite-core";

export const userTable = s.sqliteTable(
  "users",
  {
    id: s.integer("id").primaryKey({ autoIncrement: true }),
    uuid: s.text("uuid").unique().notNull(),
    name: s.text("name").notNull(),
    email: s.text("email").unique().notNull(),
    isEmailVerified: s
      .integer("isEmailVerified", { mode: "boolean" })
      .notNull()
      .default(false),
    status: s
      .text("status", { enum: ["ACTIVE", "INACTIVE"] })
      .notNull()
      .default("ACTIVE"),
    image: s.text("image"),
    createdAt: s.integer("created_at").notNull(),
    updatedAt: s.integer("updated_at").notNull(),
    deletedAt: s.integer("deleted_at"),
  },
  (table) => ({})
);
