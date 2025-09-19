import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSubcategories = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contents")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

export const insertContent = mutation({
  args: {
    category: v.string(),
    subcategory: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("contents", args);
  },
});

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    const data = [
      // Casa
      { category: "Casa", subcategory: "Regole della casa" },
      { category: "Casa", subcategory: "Check-in / Check-out" },
      { category: "Casa", subcategory: "Regole generali" },
      
      // Contatti & Emergenze
      { category: "Contatti & Emergenze", subcategory: "Numeri utili" },
      { category: "Contatti & Emergenze", subcategory: "Emergenze" },
      
      // Attivita & Esperienze
      { category: "Attivita & Esperienze", subcategory: "Trasporto barca (Vincenzo)" },
      { category: "Attivita & Esperienze", subcategory: "Boat tour (Alfonso)" },
      { category: "Attivita & Esperienze", subcategory: "SUP Rent (Marina dal Bori)" },
      { category: "Attivita & Esperienze", subcategory: "Ape Calessino (Antonino)" },
      
      // Food & Drink
      { category: "Food & Drink", subcategory: "Ristoranti consigliati" },
      { category: "Food & Drink", subcategory: "Menu" },
      { category: "Food & Drink", subcategory: "Tasting Menus" },
      
      // Trasporti
      { category: "Trasporti", subcategory: "Collegamenti bus / traghetti" },
      { category: "Trasporti", subcategory: "Parcheggi" },
      { category: "Trasporti", subcategory: "Noleggi auto/scooter/bici" },
    ];

    for (const item of data) {
      await ctx.db.insert("contents", item);
    }
  },
});

export const updateCategoryName = mutation({
  args: {
    oldName: v.string(),
    newName: v.string(),
  },
  handler: async (ctx, args) => {
    // Trova tutti i record con il vecchio nome della categoria
    const recordsToUpdate = await ctx.db
      .query("contents")
      .filter((q) => q.eq(q.field("category"), args.oldName))
      .collect();

    // Aggiorna ogni record con il nuovo nome
    for (const record of recordsToUpdate) {
      await ctx.db.patch(record._id, {
        category: args.newName,
      });
    }

    return { updated: recordsToUpdate.length };
  },
});
