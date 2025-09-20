"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { FormData } from "../../hooks/useFormData";

interface ContactSectionProps {
  formData: FormData;
  validationErrors: Record<string, string>;
  updateFormData: (updates: Partial<FormData>) => void;
  updateNestedField: (field: string, value: any) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  formData,
  validationErrors,
  updateFormData,
  updateNestedField,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>📞 Informazioni di Contatto</h2>
      <div style={fieldGridStyle}>
        <FormField label="Telefono">
          <Input
            type="tel"
            value={formData.contactInfo.phone}
            onChange={(e) => updateFormData({
              contactInfo: { ...formData.contactInfo, phone: e.target.value }
            })}
          />
        </FormField>
        
        <FormField
          label="Email"
          error={validationErrors['contactInfo.email']}
        >
          <Input
            type="email"
            value={formData.contactInfo.email}
            onChange={(e) => updateNestedField('contactInfo.email', e.target.value)}
            error={!!validationErrors['contactInfo.email']}
          />
        </FormField>
        
        <FormField label="Indirizzo">
          <Input
            type="text"
            value={formData.contactInfo.address}
            onChange={(e) => updateFormData({
              contactInfo: { ...formData.contactInfo, address: e.target.value }
            })}
          />
        </FormField>
        
        <FormField
          label="Sito Web"
          error={validationErrors['contactInfo.website']}
        >
          <Input
            type="url"
            value={formData.contactInfo.website}
            onChange={(e) => updateNestedField('contactInfo.website', e.target.value)}
            error={!!validationErrors['contactInfo.website']}
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