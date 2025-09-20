"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import type { Id } from "../../../convex/_generated/dataModel";

// Import components
import { Header, CreateForm, CreateToggle, SearchBar, CompactFilters, CompactTable } from "./components";

// Import hooks
import { useAdminToken, useAdminEmail, useContentsManagement } from "./hooks";

// Import styles
import {
  globalStyles,
  mainContainerStyle,
  sectionStyle,
  sectionTitleStyle,
} from "./styles/globalStyles";

export default function AdminDashboard() {
  const token = useAdminToken();
  const email = useAdminEmail();
  const logout = useMutation(api.adminAuth.logout);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const contents = useQuery(
    api.adminContents.adminListAllContents,
    token ? { token } : "skip"
  );

  const {
    filters,
    filteredContents,
    handleSearch,
    handleFilterChange,
    clearFilters,
  } = useContentsManagement(contents);

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

  const onCreate = async (category: string, subcategory: string) => {
    if (!token) return;
    setMessage(null);
    setError(null);
    try {
      await createContent({
        token,
        category,
        subcategory,
      });
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
    } catch {
      alert("Errore eliminazione");
    }
  };

  return (
    <main style={mainContainerStyle}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      <Header email={email} onLogout={handleLogout} />

      <CreateToggle>
        <CreateForm 
          onSubmit={onCreate}
          message={message}
          error={error}
        />
      </CreateToggle>

      <section style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Tutti i contenuti</h2>

        <SearchBar
          onSearch={handleSearch}
          onClear={() => handleSearch('')}
          placeholder="Cerca per categoria, sottocategoria o titolo..."
        />

        <CompactFilters
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          activeFilters={filters}
        />

        <CompactTable
          contents={contents}
          filteredContents={filteredContents}
          onToggleActive={onQuickToggleActive}
          onDelete={onQuickDelete}
        />
      </section>
    </main>
  );
}
