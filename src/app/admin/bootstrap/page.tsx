"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

/**
 * Pagina di bootstrap per creare il PRIMO admin.
 * È sicura perché la mutation sul server consente il bootstrap SOLO se non esiste già un admin.
 * Dopo l'uso, elimina questo file o lascialo: non potrà creare altri admin perché lato server verrà rifiutato.
 */
export default function AdminBootstrapPage() {
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Se già loggato reindirizza alla dashboard
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
      window.location.href = "/admin";
    }
  }, []);

  const bootstrap = useMutation(api.adminAuth.bootstrapCreateAdmin);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setErr(null);
    setLoading(true);
    try {
      await bootstrap({ email, password });
      setMsg("Admin creato. Ora puoi andare al login e accedere.");
    } catch (e: unknown) {
      if (e instanceof Error) setErr(e.message);
      else setErr("Errore durante il bootstrap");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h1>Bootstrap Admin</h1>
      <p style={{ color: "#666", marginBottom: 16 }}>
        Usa questa pagina SOLO una volta per creare il primo utente admin. In seguito, la mutation lato server impedirà altri bootstrap.
      </p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            background: "#111",
            color: "#fff",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Creazione..." : "Crea admin"}
        </button>
        {msg && <div style={{ color: "green" }}>{msg}</div>}
        {err && <div style={{ color: "crimson" }}>{err}</div>}
      </form>
      <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
        <Link href="/admin/login">Vai al Login</Link>
        <Link href="/">← Torna al sito</Link>
      </div>
    </main>
  );
}
