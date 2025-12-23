import { AnyD1Database, DrizzleD1Database } from "drizzle-orm/d1";
import { Logger } from "pino";
import * as schema from "@/db/schema";

export type Bindings = {
  DB: AnyD1Database;
  APP_ENV: string;
};

export type Variables = {
  requestId: string;
  logger: Logger;
  db: DrizzleD1DatabaseContext;
};

export type HttpContext = {
  Bindings: Bindings;
  Variables: Variables;
};

export type Pagination = {
  offset: number;
  limit: number;
};

export type DrizzleD1DatabaseContext = DrizzleD1Database<typeof schema.schema>;
