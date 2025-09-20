export const globalStyles = `
  * {
    box-sizing: border-box;
  }
  
  input::placeholder,
  textarea::placeholder,
  select::placeholder {
    color: #6b7280;
    opacity: 1;
  }
  
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    .nav-tabs {
      flex-wrap: wrap;
    }
    
    .nav-tab {
      flex: 1;
      min-width: 120px;
    }
  }
`;

// Layout principale
export const mainContainerStyle: React.CSSProperties = {
  maxWidth: 1000,
  margin: "0 auto",
  padding: "20px",
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

export const headerStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  marginBottom: "24px",
};

export const headerTopStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
};

export const titleStyle: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "700",
  margin: 0,
};

export const headerActionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

export const unsavedIndicatorStyle: React.CSSProperties = {
  color: "#f59e0b",
  fontSize: "14px",
  fontWeight: "500",
};

export const backLinkStyle: React.CSSProperties = {
  color: "#6b7280",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  transition: "all 0.2s",
};

export const breadcrumbStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "16px",
  color: "#6b7280",
};

export const breadcrumbItemStyle: React.CSSProperties = {
  fontWeight: "500",
};

export const breadcrumbSeparatorStyle: React.CSSProperties = {
  color: "#d1d5db",
};

// Navigazione
export const navStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginBottom: "24px",
  overflowX: "auto",
  paddingBottom: "8px",
};

// Form
export const formStyle: React.CSSProperties = {
  backgroundColor: "white",
  borderRadius: "12px",
  padding: "24px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

// Pulsanti di azione
export const actionButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "12px",
  justifyContent: "flex-end",
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid #e5e7eb",
};