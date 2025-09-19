"use client";

import { useEffect, useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";
import Link from "next/link";

function useAdminToken() {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    const exp = Number(localStorage.getItem("adminTokenExpiresAt") || 0);
    if (!t || !exp || Date.now() > exp) {
      setToken(null);
    } else {
      setToken(t);
    }
  }, []);
  return token;
}

export default function AdminDashboard() {
  const token = useAdminToken();
  const logout = useMutation(api.adminAuth.logout);
  const [createForm, setCreateForm] = useState({ category: "", subcategory: "" });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Sorting state
  const [sort, setSort] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);

  // Filtering state
  const [filters, setFilters] = useState({
    category: '',
    subcategory: '',
    title: '',
    active: '' as 'true' | 'false' | '',
    priorityMin: '',
    priorityMax: '',
  });

  const contents = useQuery(
    api.adminContents.adminListAllContents,
    token ? { token } : "skip"
  );

  // Filtered and sorted contents
  const filteredContents = useMemo(() => {
    if (!contents) return [];
    return contents
      .filter((c) => {
        const matchesCategory = !filters.category || c.category.toLowerCase().includes(filters.category.toLowerCase());
        const matchesSubcategory = !filters.subcategory || c.subcategory.toLowerCase().includes(filters.subcategory.toLowerCase());
        const matchesTitle = !filters.title || (c.title || '').toLowerCase().includes(filters.title.toLowerCase());
        const matchesActive = !filters.active || String(c.isActive ?? false).toLowerCase() === filters.active.toLowerCase();
        const priorityNum = c.priority ?? 0;
        const matchesPriorityMin = !filters.priorityMin || priorityNum >= Number(filters.priorityMin);
        const matchesPriorityMax = !filters.priorityMax || priorityNum <= Number(filters.priorityMax);
        return matchesCategory && matchesSubcategory && matchesTitle && matchesActive && matchesPriorityMin && matchesPriorityMax;
      })
      .sort((a, b) => {
        if (!sort) return 0;
        let aVal = a[sort.column as keyof typeof a] ?? '';
        let bVal = b[sort.column as keyof typeof b] ?? '';
        // Handle priority as number
        if (sort.column === 'priority') {
          aVal = (aVal ?? 0) as number;
          bVal = (bVal ?? 0) as number;
        }
        // Handle active as boolean
        if (sort.column === 'isActive') {
          aVal = String(aVal ?? false);
          bVal = String(bVal ?? false);
        }
        if (aVal < bVal) return sort.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      });
  }, [contents, sort, filters]);

  const createContent = useMutation(api.adminContents.adminCreateContent);
  const updateContent = useMutation(api.adminContents.adminUpdateContent);
  const deleteContent = useMutation(api.adminContents.adminDeleteContent);

  useEffect(() => {
    // redirect se non loggato
    if (token === null) {
      // piccolo delay per permettere a useEffect di leggere localStorage al mount
      const id = setTimeout(() => {
        window.location.href = "/admin/login";
      }, 300);
      return () => clearTimeout(id);
    }
  }, [token]);

  const handleSort = (column: string) => {
    if (sort?.column === column) {
      setSort({ column, direction: sort.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSort({ column, direction: 'asc' });
    }
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      subcategory: '',
      title: '',
      active: '',
      priorityMin: '',
      priorityMax: '',
    });
    setSort(null);
  };

  const handleLogout = async () => {
    try {
      if (token) await logout({ token });
    } catch (err) {
      // ignore logout errors
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminTokenExpiresAt");
      localStorage.removeItem("adminEmail");
      window.location.href = "/admin/login";
    }
  };

  const onCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setMessage(null);
    setError(null);
    try {
      await createContent({
        token,
        category: createForm.category.trim(),
        subcategory: createForm.subcategory.trim(),
      });
      setCreateForm({ category: "", subcategory: "" });
      setMessage("Contenuto creato.");
    } catch (err) {
      setError((err as Error).message || "Errore creazione contenuto");
    }
  };

  const onQuickToggleActive = async (id: string, isActive: boolean) => {
    if (!token) return;
    try {
      await updateContent({
        token,
        id: id as Id<"contents">,
        patch: { isActive: !isActive },
      });
    } catch (err) {
      console.error("Errore aggiornamento:", err);
      alert("Errore aggiornamento");
    }
  };

  const onQuickDelete = async (id: string) => {
    if (!token) return;
    if (!confirm("Eliminare il contenuto?")) return;
    try {
      await deleteContent({ token, id: id as Id<"contents"> });
    } catch (err) {
      alert("Errore eliminazione");
    }
  };

  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    setEmail(storedEmail);
  }, []);

  return (
    <main style={{ maxWidth: 960, margin: "40px auto", padding: 16 }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          color: "#ededed",
        }}
      >
        <div>
          <h1 style={{ marginBottom: 4, color: "#fff" }}>Dashboard Contenuti</h1>
          <div style={{ color: "#ccc" }}>
            {email ? `Loggato come ${email}` : "—"}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Link href="/" style={{ color: "#ededed", textDecoration: "none" }}>Vai al sito</Link>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 12px",
              background: "#333",
              border: "1px solid #444",
              borderRadius: 6,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Crea contenuto minimo */}
      <section
        style={{
          padding: 16,
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <h2 style={{ marginBottom: 12, color: "#fff" }}>Crea contenuto (minimo)</h2>
        <form onSubmit={onCreate} style={{ display: "grid", gap: 10, maxWidth: 480 }}>
          <input
            type="text"
            placeholder="Categoria"
            value={createForm.category}
            onChange={(e) => setCreateForm((s) => ({ ...s, category: e.target.value }))}
            required
            style={{ 
              padding: 10, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <input
            type="text"
            placeholder="Sottocategoria"
            value={createForm.subcategory}
            onChange={(e) =>
              setCreateForm((s) => ({ ...s, subcategory: e.target.value }))
            }
            required
            style={{ 
              padding: 10, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 14px",
              background: "#333",
              color: "#fff",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Crea
          </button>
          {message && <div style={{ color: "#4ade80" }}>{message}</div>}
          {error && <div style={{ color: "#f87171" }}>{error}</div>}
        </form>
      </section>

      {/* Lista contenuti */}
      <section
        style={{
          padding: 16,
          background: "#1a1a1a",
          border: "1px solid #333",
          borderRadius: 8,
        }}
      >
        <h2 style={{ marginBottom: 12, color: "#fff" }}>Tutti i contenuti</h2>

        {/* Filtri */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Filtra per categoria"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            style={{ 
              padding: 8, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <input
            type="text"
            placeholder="Filtra per sottocategoria"
            value={filters.subcategory}
            onChange={(e) => handleFilterChange('subcategory', e.target.value)}
            style={{ 
              padding: 8, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <input
            type="text"
            placeholder="Filtra per titolo"
            value={filters.title}
            onChange={(e) => handleFilterChange('title', e.target.value)}
            style={{ 
              padding: 8, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <select
            value={filters.active}
            onChange={(e) => handleFilterChange('active', e.target.value)}
            style={{ 
              padding: 8, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          >
            <option value="">Tutti gli stati</option>
            <option value="true">Attivo</option>
            <option value="false">Non attivo</option>
          </select>
          <input
            type="number"
            placeholder="Priorità min"
            value={filters.priorityMin}
            onChange={(e) => handleFilterChange('priorityMin', e.target.value)}
            style={{ 
              padding: 8, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <input
            type="number"
            placeholder="Priorità max"
            value={filters.priorityMax}
            onChange={(e) => handleFilterChange('priorityMax', e.target.value)}
            style={{ 
              padding: 8, 
              background: "#2a2a2a",
              border: "1px solid #444", 
              borderRadius: 6,
              color: "#fff"
            }}
          />
          <button
            onClick={clearFilters}
            style={{
              padding: "8px 12px",
              background: "#444",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Pulisci filtri
          </button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 12, color: "#ccc", fontSize: "14px" }}>
          Risultati: {filteredContents.length} di {contents?.length || 0}
        </div>

        {!contents ? (
          <div style={{ color: "#ccc" }}>Caricamento...</div>
        ) : filteredContents.length === 0 ? (
          <div style={{ color: "#ccc" }}>Nessun contenuto trovato.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr style={{ background: "#111" }}>
                  <th 
                    style={{ ...th, color: "#fff", borderBottom: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleSort('category')}
                  >
                    Categoria {sort?.column === 'category' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{ ...th, color: "#fff", borderBottom: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleSort('subcategory')}
                  >
                    Sottocategoria {sort?.column === 'subcategory' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{ ...th, color: "#fff", borderBottom: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleSort('title')}
                  >
                    Titolo {sort?.column === 'title' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{ ...th, color: "#fff", borderBottom: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleSort('isActive')}
                  >
                    Attivo {sort?.column === 'isActive' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th 
                    style={{ ...th, color: "#fff", borderBottom: "1px solid #333", cursor: "pointer" }}
                    onClick={() => handleSort('priority')}
                  >
                    Priorità {sort?.column === 'priority' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </th>
                  <th style={{ ...th, color: "#fff", borderBottom: "1px solid #333" }}>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredContents.map((c, index) => (
                  <tr 
                    key={c._id}
                    style={{ 
                      background: index % 2 === 0 ? "#1a1a1a" : "#111",
                      color: "#fff"
                    }}
                  >
                    <td style={{ ...td, color: "#ededed", borderBottom: "1px solid #333" }}>{c.category}</td>
                    <td style={{ ...td, color: "#ededed", borderBottom: "1px solid #333" }}>{c.subcategory}</td>
                    <td style={{ ...td, color: "#ededed", borderBottom: "1px solid #333" }}>{c.title || "-"}</td>
                    <td style={{ ...td, color: "#ededed", borderBottom: "1px solid #333" }}>{String(c.isActive ?? false)}</td>
                    <td style={{ ...td, color: "#ededed", borderBottom: "1px solid #333" }}>{c.priority ?? 0}</td>
                    <td style={{ ...td, borderBottom: "1px solid #333" }}>
                      <Link
                        href={`/admin/edit/${c._id}`}
                        style={{ 
                          ...btn, 
                          textDecoration: "none", 
                          color: "#ededed", 
                          display: "inline-block",
                          background: "#333",
                          border: "1px solid #444"
                        }}
                        title="Modifica contenuto"
                      >
                        Modifica
                      </Link>
                      <button
                        onClick={() => onQuickToggleActive(c._id, c.isActive ?? false)}
                        style={{ 
                          ...btn,
                          background: "#333",
                          border: "1px solid #444",
                          color: "#ededed"
                        }}
                        title="Toggle attivo"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => onQuickDelete(c._id)}
                        style={{ 
                          ...btn, 
                          background: "#4a1a1a", 
                          borderColor: "#662929",
                          color: "#ffcccc"
                        }}
                        title="Elimina"
                      >
                        Elimina
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}

const th: React.CSSProperties = {
  textAlign: "left",
  borderBottom: "1px solid #333",
  padding: 8,
  whiteSpace: "nowrap",
  color: "#fff",
};

const td: React.CSSProperties = {
  borderBottom: "1px solid #333",
  padding: 8,
  verticalAlign: "top",
  color: "#ededed",
};

const btn: React.CSSProperties = {
  padding: "6px 10px",
  border: "1px solid #444",
  borderRadius: 6,
  background: "#333",
  cursor: "pointer",
  marginRight: 8,
  color: "#ededed",
};
