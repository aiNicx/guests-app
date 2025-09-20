"use client";

import React from "react";

interface MessageProps {
  type: "success" | "error";
  children: React.ReactNode;
}

export const Message: React.FC<MessageProps> = ({ type, children }) => {
  const style = type === "success" ? successMessageStyle : errorMessageStyle;
  const icon = type === "success" ? "✅" : "❌";

  return (
    <div style={style}>
      {icon} {children}
    </div>
  );
};

const successMessageStyle: React.CSSProperties = {
  color: "#059669",
  backgroundColor: "#ecfdf5",
  border: "1px solid #a7f3d0",
  padding: "12px 16px",
  borderRadius: "8px",
  textAlign: "center",
  marginTop: "16px",
  fontSize: "14px",
  fontWeight: "500",
};

const errorMessageStyle: React.CSSProperties = {
  color: "#dc2626",
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  padding: "12px 16px",
  borderRadius: "8px",
  textAlign: "center",
  marginTop: "16px",
  fontSize: "14px",
  fontWeight: "500",
};