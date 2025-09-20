"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { FormData } from "../../hooks/useFormData";

interface SettingsSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>⚙️ Impostazioni</h2>
      <div style={fieldGridStyle}>
        <FormField label="Tag">
          <Input
            type="text"
            value={formData.tags.join(", ")}
            onChange={(e) => updateFormData({
              tags: e.target.value.split(",").map(tag => tag.trim()).filter(Boolean)
            })}
            placeholder="Separati da virgola (es: museo, arte, storia)"
          />
        </FormField>
        
        <FormField label="Priorità (0-100)">
          <Input
            type="number"
            min="0"
            max="100"
            value={formData.priority}
            onChange={(e) => updateFormData({
              priority: parseInt(e.target.value) || 0
            })}
          />
        </FormField>
        
        <FormField label="">
          <label style={checkboxLabelStyle}>
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => updateFormData({
                isActive: e.target.checked
              })}
              style={checkboxStyle}
            />
            <span style={checkboxTextStyle}>Contenuto attivo</span>
          </label>
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

const checkboxLabelStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
};

const checkboxStyle: React.CSSProperties = {
  width: "18px",
  height: "18px",
  accentColor: "#3b82f6",
};

const checkboxTextStyle: React.CSSProperties = {
  fontSize: "14px",
  color: "#374151",
  fontWeight: "500",
};