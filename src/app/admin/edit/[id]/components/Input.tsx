"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input: React.FC<InputProps> = ({ error, style, ...props }) => {
  return (
    <input
      style={{
        ...inputStyle,
        ...(error ? errorInputStyle : {}),
        ...style,
      }}
      {...props}
    />
  );
};

const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1f2937",
  backgroundColor: "white",
  transition: "all 0.2s",
};

const errorInputStyle: React.CSSProperties = {
  borderColor: "#ef4444",
  backgroundColor: "#fef2f2",
};