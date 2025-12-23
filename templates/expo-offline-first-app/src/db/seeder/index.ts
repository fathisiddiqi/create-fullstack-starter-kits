import { db } from "../index";
import { chat } from "../schema";

export const seedChat = async () => {
  await db.insert(chat).values([
    {
      id: 1,
      message: "Hello, how are you?",
      sender: "assistant",
      receiver: "user",
    },
  ]);
};

export const seedData = async () => {
  await seedChat();
};

seedData().then(() => {
  console.log("Database seeded");
});
