import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contents: defineTable({
    category: v.string(),
    subcategory: v.string(),
  }),
});
