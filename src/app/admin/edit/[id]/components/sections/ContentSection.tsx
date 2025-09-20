"use client";

import React from "react";
import { FormField } from "../FormField";
import { Textarea } from "../Textarea";
import { Input } from "../Input";
import { Button } from "../Button";
import { FormData } from "../../hooks/useFormData";

interface ContentSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  addInstruction: () => void;
  updateInstruction: (index: number, value: string) => void;
  removeInstruction: (index: number) => void;
  addTip: () => void;
  updateTip: (index: number, value: string) => void;
  removeTip: (index: number) => void;
  addLink: () => void;
  updateLink: (index: number, field: string, value: string) => void;
  removeLink: (index: number) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  formData,
  updateFormData,
  addInstruction,
  updateInstruction,
  removeInstruction,
  addTip,
  updateTip,
  removeTip,
  addLink,
  updateLink,
  removeLink,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>📄 Contenuto Dettagliato</h2>
      
      {/* Contenuto principale */}
      <FormField label="Contenuto Dettagliato">
        <Textarea
          value={formData.content}
          onChange={(e) => updateFormData({ content: e.target.value })}
          style={{ minHeight: 120 }}
          rows={5}
        />
      </FormField>

      {/* Istruzioni */}
      <div style={dynamicSectionStyle}>
        <div style={dynamicSectionHeaderStyle}>
          <h3 style={dynamicSectionTitleStyle}>Istruzioni</h3>
          <Button type="button" onClick={addInstruction} size="sm">
            + Aggiungi
          </Button>
        </div>
        {formData.instructions.map((instruction, index) => (
          <div key={index} style={dynamicItemStyle}>
            <Input
              type="text"
              value={instruction}
              onChange={(e) => updateInstruction(index, e.target.value)}
              placeholder={`Istruzione ${index + 1}`}
              style={{ flex: 1 }}
            />
            <Button
              type="button"
              onClick={() => removeInstruction(index)}
              variant="danger"
              size="sm"
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      {/* Consigli */}
      <div style={dynamicSectionStyle}>
        <div style={dynamicSectionHeaderStyle}>
          <h3 style={dynamicSectionTitleStyle}>Consigli</h3>
          <Button type="button" onClick={addTip} size="sm">
            + Aggiungi
          </Button>
        </div>
        {formData.tips.map((tip, index) => (
          <div key={index} style={dynamicItemStyle}>
            <Input
              type="text"
              value={tip}
              onChange={(e) => updateTip(index, e.target.value)}
              placeholder={`Consiglio ${index + 1}`}
              style={{ flex: 1 }}
            />
            <Button
              type="button"
              onClick={() => removeTip(index)}
              variant="danger"
              size="sm"
            >
              ×
            </Button>
          </div>
        ))}
      </div>

      {/* Link */}
      <div style={dynamicSectionStyle}>
        <div style={dynamicSectionHeaderStyle}>
          <h3 style={dynamicSectionTitleStyle}>Link Utili</h3>
          <Button type="button" onClick={addLink} size="sm">
            + Aggiungi
          </Button>
        </div>
        {formData.links.map((link, index) => (
          <div key={index} style={linkItemStyle}>
            <div style={linkItemHeaderStyle}>
              <span style={linkItemTitleStyle}>Link {index + 1}</span>
              <Button
                type="button"
                onClick={() => removeLink(index)}
                variant="danger"
                size="sm"
              >
                ×
              </Button>
            </div>
            <div style={linkFieldsStyle}>
              <Input
                type="text"
                value={link.title}
                onChange={(e) => updateLink(index, "title", e.target.value)}
                placeholder="Titolo del link"
              />
              <Input
                type="url"
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                placeholder="URL"
              />
              <Input
                type="text"
                value={link.description}
                onChange={(e) => updateLink(index, "description", e.target.value)}
                placeholder="Descrizione (opzionale)"
              />
            </div>
          </div>
        ))}
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

const dynamicSectionStyle: React.CSSProperties = {
  marginTop: "32px",
  padding: "20px",
  backgroundColor: "#f8fafc",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
};

const dynamicSectionHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
};

const dynamicSectionTitleStyle: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#374151",
  margin: 0,
};

const dynamicItemStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginBottom: "8px",
};

const linkItemStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  padding: "16px",
  borderRadius: "8px",
  backgroundColor: "white",
  marginBottom: "12px",
};

const linkItemHeaderStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

const linkItemTitleStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "600",
  color: "#374151",
};

const linkFieldsStyle: React.CSSProperties = {
  display: "grid",
  gap: "8px",
};