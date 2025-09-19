import { query, mutation } from "./_generated/server";

export const list = query(async ({ db }) => {
  return await db.query("messages").collect();
});

export const add = mutation(async ({ db }, { text }: { text: string }) => {
  await db.insert("messages", { text });
});
