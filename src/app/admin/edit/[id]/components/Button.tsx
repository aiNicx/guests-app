"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  style,
  disabled,
  ...props
}) => {
  const baseStyle = {
    ...buttonBaseStyle,
    ...buttonVariants[variant],
    ...buttonSizes[size],
    ...(loading || disabled ? disabledButtonStyle : {}),
    ...style,
  };

  return (
    <button style={baseStyle} disabled={disabled || loading} {...props}>
      {loading && <span style={loadingSpinnerStyle}>⟳</span>}
      {children}
    </button>
  );
};

const buttonBaseStyle: React.CSSProperties = {
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "500",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
};

const buttonVariants = {
  primary: {
    backgroundColor: "#3b82f6",
    color: "white",
  },
  secondary: {
    backgroundColor: "#6b7280",
    color: "white",
  },
  danger: {
    backgroundColor: "#ef4444",
    color: "white",
  },
  success: {
    backgroundColor: "#10b981",
    color: "white",
  },
};

const buttonSizes = {
  sm: {
    padding: "8px 16px",
    fontSize: "12px",
  },
  md: {
    padding: "12px 24px",
    fontSize: "16px",
  },
  lg: {
    padding: "16px 32px",
    fontSize: "18px",
  },
};

const disabledButtonStyle: React.CSSProperties = {
  backgroundColor: "#9ca3af",
  cursor: "not-allowed",
};

const loadingSpinnerStyle: React.CSSProperties = {
  animation: "spin 1s linear infinite",
  display: "inline-block",
};