"use client";

import { useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";

export default function AdminLoginPage() {
  const login = useMutation(api.adminAuth.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Se già loggato, vai alla dashboard
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (token) {
      window.location.href = "/admin";
    }
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await login({ email, password });
      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("adminTokenExpiresAt", String(res.expiresAt));
      localStorage.setItem("adminEmail", res.email);
      window.location.href = "/admin";
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      } else {
        setErr("Errore di login");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1>Admin Login</h1>
      <p style={{ color: "#666", marginBottom: 16 }}>
        Accedi con le credenziali admin per gestire i contenuti.
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
          {loading ? "Accesso in corso..." : "Accedi"}
        </button>
        {err && <div style={{ color: "crimson" }}>{err}</div>}
      </form>
      <div style={{ marginTop: 24 }}>
        <Link href="/">← Torna al sito</Link>
      </div>
    </main>
  );
}
