"use client";

import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({ error, style, ...props }) => {
  return (
    <textarea
      style={{
        ...textareaStyle,
        ...(error ? errorInputStyle : {}),
        ...style,
      }}
      {...props}
    />
  );
};

const textareaStyle: React.CSSProperties = {
  padding: "12px 16px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1f2937",
  backgroundColor: "white",
  transition: "all 0.2s",
  resize: "vertical",
  fontFamily: "inherit",
};

const errorInputStyle: React.CSSProperties = {
  borderColor: "#ef4444",
  backgroundColor: "#fef2f2",
};