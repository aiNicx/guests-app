"use client";

import React from "react";

interface FormSectionProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: () => void;
}

export const FormSection: React.FC<FormSectionProps> = ({
  id,
  label,
  icon,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{
        ...tabStyle,
        ...(isActive ? activeTabStyle : {}),
      }}
    >
      <span style={tabIconStyle}>{icon}</span>
      <span style={tabLabelStyle}>{label}</span>
    </button>
  );
};

const tabStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "12px 16px",
  backgroundColor: "white",
  borderWidth: "1px",
  borderStyle: "solid",
  borderColor: "#e5e7eb",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  color: "#6b7280",
  transition: "all 0.2s",
  whiteSpace: "nowrap",
};

const activeTabStyle: React.CSSProperties = {
  backgroundColor: "#3b82f6",
  color: "white",
  borderColor: "#3b82f6",
};

const tabIconStyle: React.CSSProperties = {
  fontSize: "16px",
};

const tabLabelStyle: React.CSSProperties = {
  fontSize: "14px",
};