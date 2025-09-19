"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

function useAdminToken() {
  const [token, setToken] = useState<string | null>(() => {
    const t = localStorage.getItem("adminToken");
    const exp = Number(localStorage.getItem("adminTokenExpiresAt") || 0);
    if (!t || !exp || Date.now() > exp) {
      return null;
    }
    return t;
  });

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    const exp = Number(localStorage.getItem("adminTokenExpiresAt") || 0);
    if (!t || !exp || Date.now() > exp) {
      if (token !== null) setToken(null);
    } else {
      if (token !== t) setToken(t);
    }
  }, [token]);

  return token;
}

export default function EditContentPage() {
  // Stili per i placeholder
  const placeholderStyle = `
    input::placeholder,
    textarea::placeholder,
    select::placeholder {
      color: #555; /* Un grigio più scuro per i placeholder */
      opacity: 1; /* Assicura che il colore sia visibile */
    }
  `;
  const params = useParams();
  const router = useRouter();
  const token = useAdminToken();
  const contentId = params.id as string;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    icon: "",
    contactInfo: {
      phone: "",
      email: "",
      address: "",
      website: "",
    },
    instructions: [] as string[],
    tips: [] as string[],
    links: [] as Array<{ title: string; url: string; description: string }>,
    images: [] as string[],
    pricing: {
      price: "",
      currency: "EUR",
      notes: "",
    },
    schedule: {
      openingHours: "",
      availability: "",
      seasonality: "",
    },
    location: {
      address: "",
      coordinates: { lat: 0, lng: 0 },
      directions: "",
    },
    tags: [] as string[],
    priority: 0,
    isActive: true,
    category: "",
    subcategory: "",
  });

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const content = useQuery(
    api.adminContents.adminGetContent,
    token && contentId ? { token, id: contentId as Id<"contents"> } : "skip"
  );

  const updateContent = useMutation(api.adminContents.adminUpdateContent);

  useEffect(() => {
    if (token === null) {
      router.push("/admin/login");
    }
  }, [token, router]);

  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || "",
        description: content.description || "",
        content: content.content || "",
        icon: content.icon || "",
        contactInfo: {
          phone: content.contactInfo?.phone || "",
          email: content.contactInfo?.email || "",
          address: content.contactInfo?.address || "",
          website: content.contactInfo?.website || "",
        },
        instructions: content.instructions || [],
        tips: content.tips || [],
        links: (content.links || []).map(link => ({
          title: link.title,
          url: link.url,
          description: link.description || "",
        })),
        images: content.images || [],
        pricing: {
          price: content.pricing?.price || "",
          currency: content.pricing?.currency || "EUR",
          notes: content.pricing?.notes || "",
        },
        schedule: {
          openingHours: content.schedule?.openingHours || "",
          availability: content.schedule?.availability || "",
          seasonality: content.schedule?.seasonality || "",
        },
        location: {
          address: content.location?.address || "",
          coordinates: {
            lat: Number(content.location?.coordinates?.lat) || 0,
            lng: Number(content.location?.coordinates?.lng) || 0,
          },
          directions: content.location?.directions || "",
        },
        tags: content.tags || [],
        priority: content.priority || 0,
        isActive: content.isActive ?? true,
        category: content.category,
        subcategory: content.subcategory,
      });
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      await updateContent({
        token,
        id: contentId as Id<"contents">,
        patch: formData,
      });
      setMessage("Contenuto aggiornato con successo!");
    } catch (err) {
      setError((err as Error).message || "Errore durante l'aggiornamento");
    } finally {
      setLoading(false);
    }
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, ""]
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((item, i) => i === index ? value : item)
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const addTip = () => {
    setFormData(prev => ({
      ...prev,
      tips: [...prev.tips, ""]
    }));
  };

  const updateTip = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.map((item, i) => i === index ? value : item)
    }));
  };

  const removeTip = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tips: prev.tips.filter((_, i) => i !== index)
    }));
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, { title: "", url: "", description: "" }]
    }));
  };

  const updateLink = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  if (!content && token) {
    return <div style={{ padding: 20 }}>Caricamento...</div>;
  }

  if (!content) {
    return <div style={{ padding: 20 }}>Contenuto non trovato</div>;
  }

  return (
    <main style={{ maxWidth: 800, margin: "20px auto", padding: 16 }}>
      <style dangerouslySetInnerHTML={{ __html: placeholderStyle }} />
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ color: "#333" }}>Modifica Contenuto</h1>
          <Link href="/admin" style={{ color: "#666" }}>← Torna alla Dashboard</Link>
        </div>
        <p style={{ color: "#333" }}>
          {content.category} / {content.subcategory}
        </p>
      </header>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
        {/* Informazioni base */}
        <section style={sectionStyle}>
          <h3 style={{ color: "#333" }}>Informazioni Base</h3> {/* Modificato colore testo per h3 */}
          <div style={{ display: "grid", gap: 12 }}>
            <input
              type="text"
              placeholder="Categoria"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Sottocategoria"
              value={formData.subcategory}
              onChange={(e) => setFormData(prev => ({ ...prev, subcategory: e.target.value }))}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Titolo"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              style={inputStyle}
            />
            <textarea
              placeholder="Descrizione"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{ ...inputStyle, minHeight: 80 }}
            />
            <textarea
              placeholder="Contenuto dettagliato"
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              style={{ ...inputStyle, minHeight: 120 }}
            />
            <input
              type="text"
              placeholder="Icona (emoji o nome)"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </section>

        {/* Contatti */}
        <section style={sectionStyle}>
          <h3 style={{ color: "#333" }}>Informazioni di Contatto</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              type="tel"
              placeholder="Telefono"
              value={formData.contactInfo.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, phone: e.target.value }
              }))}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.contactInfo.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, email: e.target.value }
              }))}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Indirizzo"
              value={formData.contactInfo.address}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, address: e.target.value }
              }))}
              style={inputStyle}
            />
            <input
              type="url"
              placeholder="Sito web"
              value={formData.contactInfo.website}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                contactInfo: { ...prev.contactInfo, website: e.target.value }
              }))}
              style={inputStyle}
            />
          </div>
        </section>

        {/* Istruzioni */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#333" }}>Istruzioni</h3>
            <button type="button" onClick={addInstruction} style={addButtonStyle}>
              + Aggiungi
            </button>
          </div>
          {formData.instructions.map((instruction, index) => (
            <div key={index} style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                placeholder={`Istruzione ${index + 1}`}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeInstruction(index)}
                style={removeButtonStyle}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Consigli */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#333" }}>Consigli</h3>
            <button type="button" onClick={addTip} style={addButtonStyle}>
              + Aggiungi
            </button>
          </div>
          {formData.tips.map((tip, index) => (
            <div key={index} style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                value={tip}
                onChange={(e) => updateTip(index, e.target.value)}
                placeholder={`Consiglio ${index + 1}`}
                style={{ ...inputStyle, flex: 1 }}
              />
              <button
                type="button"
                onClick={() => removeTip(index)}
                style={removeButtonStyle}
              >
                ×
              </button>
            </div>
          ))}
        </section>

        {/* Link */}
        <section style={sectionStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ color: "#333" }}>Link Utili</h3>
            <button type="button" onClick={addLink} style={addButtonStyle}>
              + Aggiungi
            </button>
          </div>
          {formData.links.map((link, index) => (
            <div key={index} style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontSize: 14, fontWeight: "bold" }}>Link {index + 1}</span>
                <button
                  type="button"
                  onClick={() => removeLink(index)}
                  style={removeButtonStyle}
                >
                  ×
                </button>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => updateLink(index, "title", e.target.value)}
                  placeholder="Titolo del link"
                  style={inputStyle}
                />
                <input
                  type="url"
                  value={link.url}
                  onChange={(e) => updateLink(index, "url", e.target.value)}
                  placeholder="URL"
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={link.description}
                  onChange={(e) => updateLink(index, "description", e.target.value)}
                  placeholder="Descrizione (opzionale)"
                  style={inputStyle}
                />
              </div>
            </div>
          ))}
        </section>

        {/* Prezzi */}
        <section style={sectionStyle}>
          <h3 style={{ color: "#333" }}>Prezzi</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              type="text"
              placeholder="Prezzo (es. 10-20)"
              value={formData.pricing.price}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, price: e.target.value }
              }))}
              style={inputStyle}
            />
            <select
              value={formData.pricing.currency}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, currency: e.target.value }
              }))}
              style={inputStyle}
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <input
              type="text"
              placeholder="Note sui prezzi"
              value={formData.pricing.notes}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                pricing: { ...prev.pricing, notes: e.target.value }
              }))}
              style={inputStyle}
            />
          </div>
        </section>

        {/* Orari */}
        <section style={sectionStyle}>
          <h3 style={{ color: "#333" }}>Orari e Disponibilità</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              type="text"
              placeholder="Orari di apertura"
              value={formData.schedule.openingHours}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                schedule: { ...prev.schedule, openingHours: e.target.value }
              }))}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Disponibilità"
              value={formData.schedule.availability}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                schedule: { ...prev.schedule, availability: e.target.value }
              }))}
              style={inputStyle}
            />
            <input
              type="text"
              placeholder="Stagionalità"
              value={formData.schedule.seasonality}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                schedule: { ...prev.schedule, seasonality: e.target.value }
              }))}
              style={inputStyle}
            />
          </div>
        </section>

        {/* Posizione */}
        <section style={sectionStyle}>
          <h3 style={{ color: "#333" }}>Posizione</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              type="text"
              placeholder="Indirizzo completo"
              value={formData.location.address}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: { ...prev.location, address: e.target.value }
              }))}
              style={inputStyle}
            />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <input
                type="number"
                step="any"
                placeholder="Latitudine"
                value={formData.location.coordinates.lat || ""}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    coordinates: {
                      ...prev.location.coordinates,
                      lat: parseFloat(e.target.value) || 0
                    }
                  }
                }))}
                style={inputStyle}
              />
              <input
                type="number"
                step="any"
                placeholder="Longitudine"
                value={formData.location.coordinates.lng || ""}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: {
                    ...prev.location,
                    coordinates: {
                      ...prev.location.coordinates,
                      lng: parseFloat(e.target.value) || 0
                    }
                  }
                }))}
                style={inputStyle}
              />
            </div>
            <textarea
              placeholder="Indicazioni per raggiungere il luogo"
              value={formData.location.directions}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                location: { ...prev.location, directions: e.target.value }
              }))}
              style={{ ...inputStyle, minHeight: 60 }}
            />
          </div>
        </section>

        {/* Impostazioni */}
        <section style={sectionStyle}>
          <h3 style={{ color: "#333" }}>Impostazioni</h3>
          <div style={{ display: "grid", gap: 12 }}>
            <input
              type="text"
              placeholder="Tag (separati da virgola)"
              value={formData.tags.join(", ")}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
              }))}
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Priorità (0-100)"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                priority: parseInt(e.target.value) || 0
              }))}
              style={inputStyle}
            />
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "#333" }}>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  isActive: e.target.checked
                }))}
              />
              Contenuto attivo
            </label>
          </div>
        </section>

        {/* Pulsanti */}
        <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
          <Link href="/admin" style={cancelButtonStyle}>
            Annulla
          </Link>
          <button
            type="submit"
            disabled={loading}
            style={submitButtonStyle}
          >
            {loading ? "Salvando..." : "Salva Modifiche"}
          </button>
        </div>

        {message && <div style={{ color: "green", textAlign: "center" }}>{message}</div>}
        {error && <div style={{ color: "crimson", textAlign: "center" }}>{error}</div>}
      </form>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  padding: 16,
  border: "1px solid #eee",
  borderRadius: 8,
  backgroundColor: "#fafafa",
};

const inputStyle: React.CSSProperties = {
  padding: 10,
  border: "1px solid #ddd",
  borderRadius: 6,
  fontSize: 14,
  color: "#333", // Aggiunto colore del testo scuro
};

const addButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 12,
};

const removeButtonStyle: React.CSSProperties = {
  padding: "6px 10px",
  background: "#dc3545",
  color: "white",
  border: "none",
  borderRadius: 4,
  cursor: "pointer",
  fontSize: 14,
  fontWeight: "bold",
};

const submitButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  background: "#28a745",
  color: "white",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  fontSize: 16,
  fontWeight: "bold",
};

const cancelButtonStyle: React.CSSProperties = {
  padding: "12px 24px",
  background: "#6c757d",
  color: "white",
  textDecoration: "none",
  borderRadius: 6,
  fontSize: 16,
  textAlign: "center",
};
