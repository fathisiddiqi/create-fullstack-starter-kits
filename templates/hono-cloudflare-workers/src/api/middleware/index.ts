import pino from "pino";
import { drizzle } from "drizzle-orm/d1";
import { appFactory } from "@/lib/app-factory";
import * as schema from "@/db/schema";

const pinoLogger = pino();

export const loggerMiddleware = appFactory.createMiddleware(async (c, next) => {
  c.set("logger", pinoLogger.child({ requestId: c.var.requestId }));
  await next();
});

export const dbMiddleware = appFactory.createMiddleware(async (c, next) => {
  const db = drizzle(c.env.DB, { schema: schema.schema });
  c.set("db", db);

  await next();
});
