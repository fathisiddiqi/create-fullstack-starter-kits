import z from "zod";
import { v4 as uuidv4 } from "uuid";
import {
  createUserSchema,
  updateUserSchema,
  userResponseSchema,
  userSchema,
  UserStatus,
} from "./schema";
import { DrizzleD1DatabaseContext } from "@/types";
import {
  createUserRepository,
  deleteUserByIdRepository,
  getUserByIdRepository,
  getUsersRepository,
  updateUserRepository,
} from "./repository";

export const createUserService = async (
  db: DrizzleD1DatabaseContext,
  payload: z.infer<typeof createUserSchema>
): Promise<z.infer<typeof userResponseSchema>> => {
  const res = await createUserRepository(db, {
    uuid: uuidv4(),
    name: payload.name,
    email: payload.email,
    image: payload.image,
    isEmailVerified: false,
    status: UserStatus.ACTIVE,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  } as z.infer<typeof userSchema>);

  return userResponseSchema.parse(res);
};

export const updateUserService = async (
  db: DrizzleD1DatabaseContext,
  id: string,
  payload: z.infer<typeof updateUserSchema>
): Promise<z.infer<typeof userResponseSchema>> => {
  const user = await getUserByIdRepository(db, id);
  if (!user) {
    throw new Error("User not found");
  }

  const userPayload = {
    ...user,
    ...payload,
    updatedAt: Date.now(),
  };

  const res = await updateUserRepository(db, id, userPayload);

  return userResponseSchema.parse(res);
};

export const getUserService = async (
  db: DrizzleD1DatabaseContext,
  id: string
): Promise<z.infer<typeof userResponseSchema>> => {
  const res = await getUserByIdRepository(db, id);
  if (!res) {
    throw new Error("User not found");
  }

  return userResponseSchema.parse(res);
};

export const getUsersService = async (
  db: DrizzleD1DatabaseContext
): Promise<z.infer<typeof userResponseSchema>[]> => {
  const users = await getUsersRepository(db);

  return users.map((item) => userResponseSchema.parse(item));
};

export const deleteUserService = async (
  db: DrizzleD1DatabaseContext,
  id: string
): Promise<z.infer<typeof userResponseSchema>> => {
  const res = await deleteUserByIdRepository(db, id);
  if (!res) {
    throw new Error("User not found");
  }

  return userResponseSchema.parse(res);
};
