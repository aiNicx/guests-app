"use client";

import React from "react";
import { FormField } from "../FormField";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { FormData } from "../../hooks/useFormData";

interface LocationSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  formData,
  updateFormData,
}) => {
  return (
    <div style={sectionContainerStyle}>
      <h2 style={sectionTitleStyle}>📍 Posizione</h2>
      <div style={fieldGridStyle}>
        <FormField label="Indirizzo Completo">
          <Input
            type="text"
            value={formData.location.address}
            onChange={(e) => updateFormData({
              location: { ...formData.location, address: e.target.value }
            })}
            placeholder="Via, Città, CAP, Regione"
          />
        </FormField>
        
        <div style={coordinatesContainerStyle}>
          <FormField label="Latitudine">
            <Input
              type="number"
              step="any"
              value={formData.location.coordinates.lat || ""}
              onChange={(e) => updateFormData({
                location: {
                  ...formData.location,
                  coordinates: {
                    ...formData.location.coordinates,
                    lat: parseFloat(e.target.value) || 0
                  }
                }
              })}
              placeholder="Es: 41.9028"
            />
          </FormField>
          
          <FormField label="Longitudine">
            <Input
              type="number"
              step="any"
              value={formData.location.coordinates.lng || ""}
              onChange={(e) => updateFormData({
                location: {
                  ...formData.location,
                  coordinates: {
                    ...formData.location.coordinates,
                    lng: parseFloat(e.target.value) || 0
                  }
                }
              })}
              placeholder="Es: 12.4964"
            />
          </FormField>
        </div>
        
        <FormField label="Indicazioni">
          <Textarea
            value={formData.location.directions}
            onChange={(e) => updateFormData({
              location: { ...formData.location, directions: e.target.value }
            })}
            placeholder="Come raggiungere il luogo (mezzi pubblici, parcheggio, ecc.)"
            style={{ minHeight: 80 }}
            rows={3}
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

const coordinatesContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};