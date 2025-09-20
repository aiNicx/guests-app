"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import type { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

// Import custom hooks
import { useAdminToken, useFormData, useFormValidation } from "./hooks";

// Import components
import { 
  FormSection, 
  Button, 
  Message,
  BasicInfoSection,
  ContactSection,
  ContentSection,
  PricingSection,
  ScheduleSection,
  LocationSection,
  SettingsSection
} from "./components";

// Import styles
import {
  globalStyles,
  mainContainerStyle,
  headerStyle,
  headerTopStyle,
  titleStyle,
  headerActionsStyle,
  unsavedIndicatorStyle,
  backLinkStyle,
  breadcrumbStyle,
  breadcrumbItemStyle,
  breadcrumbSeparatorStyle,
  navStyle,
  formStyle,
  actionButtonsStyle,
} from "./styles/globalStyles";

export default function EditContentPage() {
  const params = useParams();
  const router = useRouter();
  const token = useAdminToken();
  const contentId = params.id as string;
  
  // State per la navigazione tra sezioni
  const [activeSection, setActiveSection] = useState<string>("basic");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const content = useQuery(
    api.adminContents.adminGetContent,
    token && contentId ? { token, id: contentId as Id<"contents"> } : "skip"
  );

  const updateContent = useMutation(api.adminContents.adminUpdateContent);

  // Custom hooks
  const {
    formData,
    hasUnsavedChanges,
    updateFormData,
    updateField,
    updateNestedField,
    addInstruction,
    updateInstruction,
    removeInstruction,
    addTip,
    updateTip,
    removeTip,
    addLink,
    updateLink,
    removeLink,
    markAsSaved,
  } = useFormData(content);

  const {
    validationErrors,
    validateAllFields,
  } = useFormValidation();

  useEffect(() => {
    if (token === null) {
      router.push("/admin/login");
    }
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    // Validazione completa
    const errors = validateAllFields(formData);
    if (Object.keys(errors).length > 0) {
      setError("Correggi gli errori prima di salvare");
      return;
    }

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
      markAsSaved();
    } catch (err) {
      setError((err as Error).message || "Errore durante l'aggiornamento");
    } finally {
      setLoading(false);
    }
  };


  if (!content && token) {
    return <div style={{ padding: 20 }}>Caricamento...</div>;
  }

  // Definizione delle sezioni
  const sections = [
    { id: "basic", label: "Informazioni Base", icon: "📝" },
    { id: "contact", label: "Contatti", icon: "📞" },
    { id: "content", label: "Contenuto", icon: "📄" },
    { id: "pricing", label: "Prezzi", icon: "💰" },
    { id: "schedule", label: "Orari", icon: "🕒" },
    { id: "location", label: "Posizione", icon: "📍" },
    { id: "settings", label: "Impostazioni", icon: "⚙️" }
  ];

  if (!content) {
    return <div style={{ padding: 20 }}>Contenuto non trovato</div>;
  }

  return (
    <main style={mainContainerStyle}>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      
      {/* Header */}
      <header style={headerStyle}>
        <div style={headerTopStyle}>
          <h1 style={titleStyle}>Modifica Contenuto</h1>
          <div style={headerActionsStyle}>
            {hasUnsavedChanges && (
              <span style={unsavedIndicatorStyle}>● Modifiche non salvate</span>
            )}
            <Link href="/admin" style={backLinkStyle}>← Torna alla Dashboard</Link>
          </div>
        </div>
        <div style={breadcrumbStyle}>
          <span style={breadcrumbItemStyle}>{content.category}</span>
          <span style={breadcrumbSeparatorStyle}>/</span>
          <span style={breadcrumbItemStyle}>{content.subcategory}</span>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={navStyle}>
        {sections.map(section => (
          <FormSection
            key={section.id}
            id={section.id}
            label={section.label}
            icon={section.icon}
            isActive={activeSection === section.id}
            onClick={() => setActiveSection(section.id)}
          />
        ))}
      </nav>

      <form onSubmit={handleSubmit} style={formStyle}>
        {/* Sezione Informazioni Base */}
        {activeSection === "basic" && (
          <BasicInfoSection
            formData={formData}
            validationErrors={validationErrors}
            updateField={updateField}
            updateFormData={updateFormData}
          />
        )}

        {/* Sezione Contatti */}
        {activeSection === "contact" && (
          <ContactSection
            formData={formData}
            validationErrors={validationErrors}
            updateFormData={updateFormData}
            updateNestedField={updateNestedField}
          />
        )}

        {/* Sezione Contenuto */}
        {activeSection === "content" && (
          <ContentSection
            formData={formData}
            updateFormData={updateFormData}
            addInstruction={addInstruction}
            updateInstruction={updateInstruction}
            removeInstruction={removeInstruction}
            addTip={addTip}
            updateTip={updateTip}
            removeTip={removeTip}
            addLink={addLink}
            updateLink={updateLink}
            removeLink={removeLink}
          />
        )}

        {/* Sezione Prezzi */}
        {activeSection === "pricing" && (
          <PricingSection
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Sezione Orari */}
        {activeSection === "schedule" && (
          <ScheduleSection
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Sezione Posizione */}
        {activeSection === "location" && (
          <LocationSection
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Sezione Impostazioni */}
        {activeSection === "settings" && (
          <SettingsSection
            formData={formData}
            updateFormData={updateFormData}
          />
        )}

        {/* Pulsanti di azione */}
        <div style={actionButtonsStyle}>
          <Link href="/admin" style={backLinkStyle}>
            Annulla
          </Link>
          <Button
            type="submit"
            disabled={loading}
            loading={loading}
            variant="success"
          >
            {loading ? "Salvando..." : "Salva Modifiche"}
          </Button>
        </div>

        {/* Messaggi di feedback */}
        {message && <Message type="success">{message}</Message>}
        {error && <Message type="error">{error}</Message>}
      </form>
    </main>
  );
}

