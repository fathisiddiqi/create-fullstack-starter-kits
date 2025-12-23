import { HttpContext } from "@/types";
import { createFactory } from "hono/factory";

export const appFactory = createFactory<HttpContext>();
