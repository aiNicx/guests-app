import { internalQuery, internalMutation, query, mutation } from "./_generated/server";
import { v } from "convex/values";

/**
 * INTERNAL: Trova utente admin per email.
 */
export const getUserByEmail = internalQuery({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("admin_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

/**
 * INTERNAL: Verifica se esiste almeno un admin.
 */
export const adminExists = internalQuery({
  args: {},
  handler: async (ctx) => {
    const any = await ctx.db.query("admin_users").first();
    return any !== null;
  },
});

/**
 * INTERNAL: Inserisce un admin con hash già calcolato.
 */
export const insertAdmin = internalMutation({
  args: {
    email: v.string(),
    hashedPassword: v.string(),
    salt: v.string(),
    iterations: v.number(),
  },
  handler: async (ctx, args) => {
    // Evita duplicati per email
    const existing = await ctx.db
      .query("admin_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) {
      throw new Error("Admin già esistente con questa email");
    }
    return await ctx.db.insert("admin_users", {
      email: args.email,
      hashedPassword: args.hashedPassword,
      salt: args.salt,
      iterations: args.iterations,
      role: "admin",
    });
  },
});

/**
 * INTERNAL: Crea una sessione admin.
 */
export const createSession = internalMutation({
  args: {
    userId: v.id("admin_users"),
    token: v.string(),
    expiresAt: v.number(), // ms epoch
  },
  handler: async (ctx, args) => {
    // Facoltativo: potresti invalidare vecchie sessioni qui
    return await ctx.db.insert("admin_sessions", {
      userId: args.userId,
      token: args.token,
      expiresAt: args.expiresAt,
    });
  },
});

/**
 * INTERNAL: Invalida una sessione per token.
 */
export const deleteSessionByToken = internalMutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (session) {
      await ctx.db.delete(session._id);
    }
    return null;
  },
});

/**
 * PUBLIC: Valida un token di sessione (per il client).
 */
export const validateSession = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session) return null;
    if (session.expiresAt <= now) {
      // sessione scaduta
      return null;
    }
    const user = await ctx.db.get(session.userId);
    if (!user) return null;
    return {
      email: user.email,
      role: user.role,
    };
  },
});

/**
 * Helpers per PBKDF2 e encoding
 */
async function pbkdf2Hash(password: string, saltBytes: Uint8Array, iterations: number): Promise<string> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );
  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: saltBytes.buffer as ArrayBuffer,
      iterations,
      hash: "SHA-256",
    },
    keyMaterial,
    256 // 256 bits = 32 bytes
  );
  const hashBytes = new Uint8Array(derivedBits);
  return bytesToBase64(hashBytes);
}

function randomBytes(length: number): Uint8Array {
  const arr = new Uint8Array(length);
  crypto.getRandomValues(arr);
  return arr;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBytes(b64: string): Uint8Array {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

/**
 * INTERNAL: Crea un admin calcolando l'hash con PBKDF2.
 * Esegui questa funzione una tantum via CLI:
 * npx convex run adminAuth:createAdmin '{ "email":"...", "password":"..." }'
 */
export const createAdmin = internalMutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("admin_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (existing) {
      throw new Error("Admin già esistente con questa email");
    }
    const salt = randomBytes(16);
    const iterations = 120_000; // abbastanza robusto per PBKDF2
    const hashedPassword = await pbkdf2Hash(args.password, salt, iterations);

    return await ctx.db.insert("admin_users", {
      email: args.email,
      hashedPassword,
      salt: bytesToBase64(salt),
      iterations,
      role: "admin",
    });
  },
});

/**
 * PUBLIC: Bootstrap: crea il primo admin se non esiste ancora.
 * Da usare una sola volta per inizializzare.
 */
export const bootstrapCreateAdmin = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    // consenti bootstrap solo se non esiste alcun admin
    const any = await ctx.db.query("admin_users").first();
    if (any) {
      throw new Error("Bootstrap non consentito: esiste già un admin");
    }
    const salt = randomBytes(16);
    const iterations = 120_000;
    const hashedPassword = await pbkdf2Hash(args.password, salt, iterations);
    const userId = await ctx.db.insert("admin_users", {
      email: args.email,
      hashedPassword,
      salt: bytesToBase64(salt),
      iterations,
      role: "admin",
    });
    return { userId };
  },
});

/**
 * PUBLIC: Login admin -> genera token di sessione con scadenza (7 giorni).
 */
export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("admin_users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    if (!user) {
      throw new Error("Credenziali non valide");
    }
    const saltBytes = base64ToBytes(user.salt);
    const candidateHash = await pbkdf2Hash(args.password, saltBytes, user.iterations);
    if (candidateHash !== user.hashedPassword) {
      throw new Error("Credenziali non valide");
    }
    const tokenBytes = randomBytes(32);
    const token = bytesToBase64(tokenBytes);
    const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 giorni
    await ctx.db.insert("admin_sessions", {
      userId: user._id,
      token,
      expiresAt,
    });
    return { token, expiresAt, email: user.email };
  },
});

/**
 * PUBLIC: Logout admin -> invalida token corrente.
 */
export const logout = mutation({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (session) {
      await ctx.db.delete(session._id);
    }
    return null;
  },
});

/**
 * PUBLIC: Me -> ritorna utente correntemente autenticato da token
 */
export const me = query({
  args: { token: v.string() },
  handler: async (ctx, args) => {
    const now = Date.now();
    const session = await ctx.db
      .query("admin_sessions")
      .withIndex("by_token", (q) => q.eq("token", args.token))
      .first();
    if (!session || session.expiresAt <= now) {
      return null;
    }
    const user = await ctx.db.get(session.userId);
    if (!user) return null;
    return {
      email: user.email,
      role: user.role,
      expiresAt: session.expiresAt,
    };
  },
});
