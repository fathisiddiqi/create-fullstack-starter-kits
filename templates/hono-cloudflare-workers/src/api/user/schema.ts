import z from "zod";

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  image: z.string().optional(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  image: z.string().optional(),
});

export const userSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
  isEmailVerified: z.boolean(),
  status: z.enum(UserStatus),
  image: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().optional(),
});

export const userResponseSchema = z.object({
  id: z.number(),
  uuid: z.string(),
  name: z.string(),
  email: z.string(),
  isEmailVerified: z.boolean(),
  status: z.enum(UserStatus),
  image: z.string().optional(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().optional(),
});
