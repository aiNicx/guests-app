"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { FormData } from "../../hooks/useFormData";

interface ScheduleSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const ScheduleSection: React.FC<ScheduleSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>🕒 Orari e Disponibilità</h2>
      <div style={fieldGridStyle}>
        <FormField label="Orari di Apertura">
          <Input
            type="text"
            value={formData.schedule.openingHours}
            onChange={(e) => updateFormData({
              schedule: { ...formData.schedule, openingHours: e.target.value }
            })}
            placeholder="Es: Lun-Ven 9:00-18:00, Sab 10:00-16:00"
          />
        </FormField>
        
        <FormField label="Disponibilità">
          <Input
            type="text"
            value={formData.schedule.availability}
            onChange={(e) => updateFormData({
              schedule: { ...formData.schedule, availability: e.target.value }
            })}
            placeholder="Es: Sempre disponibile, Solo su appuntamento"
          />
        </FormField>
        
        <FormField label="Stagionalità">
          <Input
            type="text"
            value={formData.schedule.seasonality}
            onChange={(e) => updateFormData({
              schedule: { ...formData.schedule, seasonality: e.target.value }
            })}
            placeholder="Es: Aperto tutto l'anno, Solo estate"
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