"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { FormData } from "../../hooks/useFormData";

interface BasicInfoSectionProps {
  formData: FormData;
  validationErrors: Record<string, string>;
  updateField: <K extends keyof FormData>(field: K, value: FormData[K]) => void;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
  formData,
  validationErrors,
  updateField,
  updateFormData,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>📝 Informazioni Base</h2>
      <div style={fieldGridStyle}>
        <FormField
          label="Categoria"
          required
          error={validationErrors.category}
        >
          <Input
            type="text"
            value={formData.category}
            onChange={(e) => updateField('category', e.target.value)}
            error={!!validationErrors.category}
          />
        </FormField>
        
        <FormField
          label="Sottocategoria"
          required
          error={validationErrors.subcategory}
        >
          <Input
            type="text"
            value={formData.subcategory}
            onChange={(e) => updateField('subcategory', e.target.value)}
            error={!!validationErrors.subcategory}
          />
        </FormField>
        
        <FormField
          label="Titolo"
          required
          error={validationErrors.title}
        >
          <Input
            type="text"
            value={formData.title}
            onChange={(e) => updateField('title', e.target.value)}
            error={!!validationErrors.title}
          />
        </FormField>
        
        <FormField label="Descrizione">
          <Textarea
            value={formData.description}
            onChange={(e) => updateFormData({ description: e.target.value })}
            style={{ minHeight: 80 }}
            rows={3}
          />
        </FormField>
        
        <FormField label="Icona">
          <Input
            type="text"
            value={formData.icon}
            onChange={(e) => updateFormData({ icon: e.target.value })}
            placeholder="Es: 🏛️ o 'museo'"
          />
        </FormField>
      </div>
    </div>
  );
};

const sectionContainerStyle: React.CSSProperties = {
  padding: "0",
};

const sectionTitleStyle: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "20px",
  fontWeight: "600",
  margin: "0 0 24px 0",
  paddingBottom: "12px",
  borderBottom: "2px solid #f3f4f6",
};

const fieldGridStyle: React.CSSProperties = {
  display: "grid",
  gap: "20px",
};