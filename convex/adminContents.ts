import { mutation, query } from "./_generated/server";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import { v } from "convex/values";

/**
 * Helper: valida token e ritorna true/throw se non valido
 */
async function assertAdmin(ctx: QueryCtx | MutationCtx, token: string): Promise<void> {
  const now = Date.now();
  const session = await ctx.db
    .query("admin_sessions")
    .withIndex("by_token", (q) => q.eq("token", token))
    .first();
  if (!session || session.expiresAt <= now) {
    throw new Error("Unauthorized");
  }
  const user = await ctx.db.get(session.userId);
  if (!user || user.role !== "admin") {
    throw new Error("Unauthorized");
  }
}

/**
 * Admin: crea contenuto minimo (category, subcategory)
 */
export const adminCreateContent = mutation({
  args: {
    token: v.string(),
    category: v.string(),
    subcategory: v.string(),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx, args.token);
    return await ctx.db.insert("contents", {
      category: args.category,
      subcategory: args.subcategory,
      isActive: true,
      priority: 0,
    });
  },
});

/**
 * Admin: aggiorna contenuto esistente (patch parziale)
 */
export const adminUpdateContent = mutation({
  args: {
    token: v.string(),
    id: v.id("contents"),
    patch: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      content: v.optional(v.string()),
      icon: v.optional(v.string()),
      contactInfo: v.optional(
        v.object({
          phone: v.optional(v.string()),
          email: v.optional(v.string()),
          address: v.optional(v.string()),
          website: v.optional(v.string()),
        })
      ),
      instructions: v.optional(v.array(v.string())),
      tips: v.optional(v.array(v.string())),
      links: v.optional(
        v.array(
          v.object({
            title: v.string(),
            url: v.string(),
            description: v.optional(v.string()),
          })
        )
      ),
      images: v.optional(v.array(v.string())),
      pricing: v.optional(
        v.object({
          price: v.optional(v.string()),
          currency: v.optional(v.string()),
          notes: v.optional(v.string()),
        })
      ),
      schedule: v.optional(
        v.object({
          openingHours: v.optional(v.string()),
          availability: v.optional(v.string()),
          seasonality: v.optional(v.string()),
        })
      ),
      location: v.optional(
        v.object({
          address: v.optional(v.string()),
          coordinates: v.optional(
            v.object({
              lat: v.number(),
              lng: v.number(),
            })
          ),
          directions: v.optional(v.string()),
        })
      ),
      tags: v.optional(v.array(v.string())),
      priority: v.optional(v.number()),
      isActive: v.optional(v.boolean()),
      category: v.optional(v.string()),
      subcategory: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx, args.token);
    await ctx.db.patch(args.id, args.patch);
    return null;
  },
});

/**
 * Admin: elimina contenuto
 */
export const adminDeleteContent = mutation({
  args: {
    token: v.string(),
    id: v.id("contents"),
  },
  handler: async (ctx, args) => {
    await assertAdmin(ctx, args.token);
    await ctx.db.delete(args.id);
    return null;
  },
});

/**
 * Admin: ottieni un singolo contenuto per ID
 */
export const adminGetContent = query({
  args: { token: v.string(), id: v.id("contents") },
  handler: async (ctx, args) => {
    await assertAdmin(ctx, args.token);
    const content = await ctx.db.get(args.id);
    if (!content) {
      throw new Error("Contenuto non trovato");
    }
    return content;
  },
});

/**
 * Admin: lista tutti i contenuti (senza filtro isActive)
 */
export const adminListAllContents = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    await assertAdmin(ctx, args.token);
    return await ctx.db.query("contents").order("asc").collect();
  },
});
