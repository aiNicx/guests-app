import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSubcategories = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contents")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
      .collect();
  },
});

export const getSubcategoryDetail = query({
  args: { 
    category: v.string(),
    subcategory: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("contents")
      .withIndex("by_category_subcategory", (q) => 
        q.eq("category", args.category).eq("subcategory", args.subcategory)
      )
      .first();
  },
});

export const getAllContents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contents")
      .filter((q) => q.eq(q.field("isActive"), true))
      .order("asc")
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

export const createDetailedContent = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contents", {
      ...args,
      isActive: args.isActive ?? true,
      priority: args.priority ?? 0,
    });
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

export const seedDetailedData = mutation({
  args: {},
  handler: async (ctx) => {
    const detailedData = [
      // Esempio per Casa - Regole della casa
      {
        category: "Casa",
        subcategory: "Regole della casa",
        title: "Regole della Casa",
        description: "Linee guida per un soggiorno piacevole e rispettoso",
        content: "Benvenuti nella nostra casa! Per garantire un soggiorno piacevole a tutti, vi chiediamo di rispettare alcune semplici regole.",
        instructions: [
          "Check-in dalle 15:00 alle 20:00",
          "Check-out entro le 11:00",
          "Non fumare all'interno della casa",
          "Rispettare il silenzio dalle 22:00 alle 8:00",
          "Lasciare la casa pulita e in ordine"
        ],
        tips: [
          "Le chiavi sono nella cassetta di sicurezza",
          "Il WiFi è disponibile in tutta la casa",
          "Utilizzare le ciabatte fornite all'interno"
        ],
        isActive: true,
        priority: 1
      },

      // Esempio per Casa - Check-in / Check-out
      {
        category: "Casa",
        subcategory: "Check-in / Check-out",
        title: "Check-in e Check-out",
        description: "Informazioni dettagliate per l'arrivo e la partenza",
        content: "Ecco tutto quello che dovete sapere per il vostro arrivo e partenza dalla casa. Seguite queste istruzioni per un'esperienza senza problemi.",
        instructions: [
          "Arrivo: dalle 15:00 alle 20:00",
          "Chiavi: troverete le chiavi nella cassetta di sicurezza",
          "Codice cassetta: vi sarà inviato via WhatsApp il giorno dell'arrivo",
          "Check-out: entro le 11:00 del giorno di partenza",
          "Restituzione chiavi: lasciate le chiavi nella cassetta di sicurezza",
          "Pulizia: lasciate la casa in ordine come l'avete trovata"
        ],
        tips: [
          "Contattateci se avete problemi con la cassetta di sicurezza",
          "In caso di ritardo, avvisateci con anticipo",
          "Le chiavi di riserva sono nella cassetta di sicurezza",
          "Non dimenticate di chiudere tutte le finestre prima di partire"
        ],
        contactInfo: {
          phone: "+39 333 123 4567",
          email: "info@casa-isola.it"
        },
        isActive: true,
        priority: 2
      },
      
      // Esempio per Trasporti - Collegamenti bus
      {
        category: "Trasporti",
        subcategory: "Collegamenti bus / traghetti",
        title: "Collegamenti Pubblici",
        description: "Informazioni su bus e traghetti per muoversi sull'isola",
        content: "Ecco tutte le informazioni sui trasporti pubblici disponibili per raggiungere le principali destinazioni.",
        contactInfo: {
          phone: "+39 081 123456",
          website: "https://www.trasporti-isola.it"
        },
        schedule: {
          openingHours: "6:00 - 22:00",
          availability: "Tutti i giorni",
          seasonality: "Servizio ridotto in inverno"
        },
        pricing: {
          price: "€2.50 a corsa",
          currency: "€",
          notes: "Biglietti disponibili a bordo o nelle tabaccherie"
        },
        tips: [
          "Acquistare i biglietti in anticipo durante l'alta stagione",
          "Controllare gli orari aggiornati sul sito web",
          "I traghetti possono essere cancellati in caso di maltempo"
        ],
        isActive: true,
        priority: 2
      },

      // Esempio per Food & Drink - Ristoranti
      {
        category: "Food & Drink",
        subcategory: "Ristoranti consigliati",
        title: "I Nostri Ristoranti Preferiti",
        description: "Una selezione dei migliori ristoranti dell'isola",
        content: "Abbiamo selezionato per voi i migliori ristoranti dove gustare la cucina locale e internazionale.",
        links: [
          {
            title: "Ristorante Il Pescatore",
            url: "https://www.ilpescatore.it",
            description: "Specialità di pesce fresco con vista mare"
          },
          {
            title: "Trattoria da Maria",
            url: "https://www.trattoriadamaria.it", 
            description: "Cucina tradizionale napoletana"
          }
        ],
        tips: [
          "Prenotare sempre, soprattutto in estate",
          "Chiedere il pesce del giorno",
          "Provare i dolci della casa"
        ],
        isActive: true,
        priority: 3
      }
    ];

    for (const item of detailedData) {
      await ctx.db.insert("contents", item);
    }
    
    return { message: "Dati dettagliati inseriti con successo", count: detailedData.length };
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

export const activateAllContents = mutation({
  args: {},
  handler: async (ctx) => {
    const allContents = await ctx.db.query("contents").collect();
    let updated = 0;
    
    for (const content of allContents) {
      if (content.isActive !== true) {
        await ctx.db.patch(content._id, {
          isActive: true,
          priority: content.priority ?? 0
        });
        updated++;
      }
    }
    
    return { message: `Attivati ${updated} contenuti`, total: allContents.length };
  },
});

export const debugContents = query({
  args: {},
  handler: async (ctx) => {
    const allContents = await ctx.db.query("contents").collect();
    
    return {
      total: allContents.length,
      active: allContents.filter(c => c.isActive === true).length,
      inactive: allContents.filter(c => c.isActive !== true).length,
      byCategory: allContents.reduce((acc, content) => {
        acc[content.category] = (acc[content.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
      samples: allContents.slice(0, 5).map(c => ({
        category: c.category,
        subcategory: c.subcategory,
        isActive: c.isActive,
        hasTitle: !!c.title,
        hasContent: !!c.content
      }))
    };
  },
});
