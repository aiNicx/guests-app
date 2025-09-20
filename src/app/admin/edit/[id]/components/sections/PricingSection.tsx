"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { FormData } from "../../hooks/useFormData";

interface PricingSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>💰 Prezzi</h2>
      <div style={fieldGridStyle}>
        <FormField label="Prezzo">
          <Input
            type="text"
            value={formData.pricing.price}
            onChange={(e) => updateFormData({
              pricing: { ...formData.pricing, price: e.target.value }
            })}
            placeholder="Es: 10-20, Gratuito, Su richiesta"
          />
        </FormField>
        
        <FormField label="Valuta">
          <select
            value={formData.pricing.currency}
            onChange={(e) => updateFormData({
              pricing: { ...formData.pricing, currency: e.target.value }
            })}
            style={selectStyle}
          >
            <option value="EUR">EUR (€)</option>
            <option value="USD">USD ($)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </FormField>
        
        <FormField label="Note sui Prezzi">
          <Textarea
            value={formData.pricing.notes}
            onChange={(e) => updateFormData({
              pricing: { ...formData.pricing, notes: e.target.value }
            })}
            placeholder="Informazioni aggiuntive sui prezzi..."
            style={{ minHeight: 60 }}
            rows={2}
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

const selectStyle: React.CSSProperties = {
  padding: "12px 16px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1f2937",
  backgroundColor: "white",
  transition: "all 0.2s",
};