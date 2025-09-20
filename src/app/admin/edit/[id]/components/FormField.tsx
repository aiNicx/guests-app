"use client";

import React from "react";

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  children,
}) => {
  return (
    <div style={fieldGroupStyle}>
      <label style={labelStyle}>
        {label} {required && "*"}
      </label>
      {children}
      {error && <span style={errorTextStyle}>{error}</span>}
    </div>
  );
};

const fieldGroupStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const labelStyle: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
};

const errorTextStyle: React.CSSProperties = {
  fontSize: "12px",
  color: "#ef4444",
  marginTop: "4px",
};