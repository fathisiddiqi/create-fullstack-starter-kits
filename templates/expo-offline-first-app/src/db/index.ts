import { drizzle } from "drizzle-orm/op-sqlite";
import * as schema from "./schema/index";
import { open } from "@op-engineering/op-sqlite";

const opsqliteDb = open({
  name: process.env.DB_NAME || "vulus",
});

const db = drizzle(opsqliteDb, {
  schema,
});

export { db };
