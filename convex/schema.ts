import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  contents: defineTable({
    category: v.string(),
    subcategory: v.string(),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    icon: v.optional(v.string()),
    contactInfo: v.optional(v.object({
      phone: v.optional(v.string()),
      email: v.optional(v.string()),
      address: v.optional(v.string()),
      website: v.optional(v.string()),
    })),
    instructions: v.optional(v.array(v.string())),
    tips: v.optional(v.array(v.string())),
    links: v.optional(v.array(v.object({
      title: v.string(),
      url: v.string(),
      description: v.optional(v.string()),
    }))),
    images: v.optional(v.array(v.string())),
    pricing: v.optional(v.object({
      price: v.optional(v.string()),
      currency: v.optional(v.string()),
      notes: v.optional(v.string()),
    })),
    schedule: v.optional(v.object({
      openingHours: v.optional(v.string()),
      availability: v.optional(v.string()),
      seasonality: v.optional(v.string()),
    })),
    location: v.optional(v.object({
      address: v.optional(v.string()),
      coordinates: v.optional(v.object({
        lat: v.number(),
        lng: v.number(),
      })),
      directions: v.optional(v.string()),
    })),
    tags: v.optional(v.array(v.string())),
    priority: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
  }).index("by_category", ["category"])
    .index("by_category_subcategory", ["category", "subcategory"])
    .index("by_priority", ["priority"]),

  admin_users: defineTable({
    email: v.string(),
    hashedPassword: v.string(),
    salt: v.string(),
    iterations: v.number(),
    role: v.literal("admin"),
  }).index("by_email", ["email"]),

  admin_sessions: defineTable({
    userId: v.id("admin_users"),
    token: v.string(),
    expiresAt: v.number(), // ms epoch
  }).index("by_token", ["token"]),
});
