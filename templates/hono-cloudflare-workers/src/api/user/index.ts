import { appFactory } from "@/lib/app-factory";
import {
  createUserService,
  deleteUserService,
  getUserService,
  getUsersService,
  updateUserService,
} from "./service";
import { successResponse } from "@/lib/response";

const userAPI = appFactory.createApp();

userAPI.post("/", async (c) => {
  const body = await c.req.json();

  const user = await createUserService(c.var.db, body);

  return successResponse(c, user);
});

userAPI.put("/:uuid", async (c) => {
  const uuid = c.req.param("uuid");
  const body = await c.req.json();

  const user = await updateUserService(c.var.db, uuid, body);

  return successResponse(c, user);
});

userAPI.get("/", async (c) => {
  const users = await getUsersService(c.var.db);

  return successResponse(c, users);
});

userAPI.get("/:id", async (c) => {
  const id = c.req.param("id");

  const user = await getUserService(c.var.db, id);

  return successResponse(c, user);
});

userAPI.delete("/:id", async (c) => {
  const id = c.req.param("id");

  const user = await deleteUserService(c.var.db, id);

  return successResponse(c, user);
});

export default userAPI;
