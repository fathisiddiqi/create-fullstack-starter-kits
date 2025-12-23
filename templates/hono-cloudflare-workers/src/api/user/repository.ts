import { userTable } from "@/db/schema";
import { DrizzleD1DatabaseContext } from "@/types";
import { and } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { isNull } from "drizzle-orm";
import z from "zod";
import { userSchema } from "./schema";

export const createUserRepository = async (
  db: DrizzleD1DatabaseContext,
  data: z.infer<typeof userSchema>
): Promise<z.infer<typeof userSchema>> => {
  const result = await db
    .insert(userTable)
    .values(data as typeof userTable.$inferInsert)
    .returning();

  return result[0] as z.infer<typeof userSchema>;
};

export const updateUserRepository = async (
  db: DrizzleD1DatabaseContext,
  id: string,
  data: z.infer<typeof userSchema>
): Promise<z.infer<typeof userSchema>> => {
  const result = await db
    .update(userTable)
    .set(data as typeof userTable.$inferInsert)
    .where(and(eq(userTable.uuid, id), isNull(userTable.deletedAt)))
    .returning();

  return result[0] as z.infer<typeof userSchema>;
};

export const getUserByIdRepository = async (
  db: DrizzleD1DatabaseContext,
  id: string
): Promise<z.infer<typeof userSchema>> => {
  const result = await db.query.userTable.findFirst({
    where: and(eq(userTable.uuid, id), isNull(userTable.deletedAt)),
  });

  return result as z.infer<typeof userSchema>;
};

export const getUsersRepository = async (
  db: DrizzleD1DatabaseContext
): Promise<z.infer<typeof userSchema>[]> => {
  const result = await db.query.userTable.findMany({
    where: isNull(userTable.deletedAt),
  });

  return result as z.infer<typeof userSchema>[];
};

export const deleteUserByIdRepository = async (
  db: DrizzleD1DatabaseContext,
  id: string
): Promise<z.infer<typeof userSchema>> => {
  const result = await db
    .update(userTable)
    .set({ deletedAt: Date.now() })
    .where(and(eq(userTable.uuid, id), isNull(userTable.deletedAt)))
    .returning();

  return result[0] as z.infer<typeof userSchema>;
};
