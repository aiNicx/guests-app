export const globalStyles = `
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #f8fafc;
    color: #1f2937;
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
  
  button {
    cursor: pointer;
    transition: all 0.2s;
  }
  
  button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.2s;
  }
  
  a:hover {
    text-decoration: underline;
  }
  
  table {
    border-collapse: collapse;
    width: 100%;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  th, td {
    text-align: left;
    padding: 12px 16px;
    vertical-align: top;
  }
  
  th {
    white-space: nowrap;
    color: #374151;
    background: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  th:hover {
    background: #f3f4f6;
  }
  
  td {
    color: #374151;
    border-bottom: 1px solid #f3f4f6;
  }
  
  tr:hover {
    background: #f9fafb;
  }
  
  tr:last-child td {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    .filters-grid {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    table {
      min-width: 600px;
    }
    
    th, td {
      padding: 8px 12px;
      font-size: 14px;
    }
    
    .compact-table-row {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
    }
    
    .compact-table-cell {
      width: 100% !important;
    }
    
    .compact-table-actions {
      justify-content: flex-start;
      width: 100%;
    }
    
    .create-form-container {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      max-width: 400px;
      z-index: 1000;
    }
  }
  
  @media (max-width: 480px) {
    .header-actions {
      flex-direction: column;
      gap: 8px;
    }
    
    .action-buttons {
      flex-direction: column;
    }
    
    .search-bar {
      flex-direction: column;
      gap: 8px;
    }
    
    .search-input {
      width: 100%;
    }
    
    .compact-table-row {
      padding: 12px;
    }
    
    .compact-table-cell {
      font-size: 14px;
    }
    
    .status-badge, .priority-badge {
      font-size: 11px;
      padding: 2px 6px;
    }
  }
`;

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
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

export const headerTitleStyle: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "28px",
  fontWeight: "700",
  margin: 0,
  marginBottom: "4px",
};

export const headerSubtitleStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "16px",
};

export const headerActionsStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

export const linkStyle: React.CSSProperties = {
  color: "#6b7280",
  textDecoration: "none",
  fontSize: "16px",
  fontWeight: "500",
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #e5e7eb",
  transition: "all 0.2s",
};

export const logoutButtonStyle: React.CSSProperties = {
  padding: "8px 16px",
  background: "#ef4444",
  border: "1px solid #dc2626",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

export const sectionStyle: React.CSSProperties = {
  backgroundColor: "white",
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  marginBottom: "24px",
};

export const sectionTitleStyle: React.CSSProperties = {
  color: "#1f2937",
  fontSize: "20px",
  fontWeight: "600",
  margin: 0,
  marginBottom: "20px",
};

export const formStyle: React.CSSProperties = {
  display: "grid",
  gap: "16px",
  maxWidth: "480px",
};

export const inputStyle: React.CSSProperties = {
  padding: "12px 16px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  color: "#1f2937",
  fontSize: "16px",
  transition: "all 0.2s",
};

export const buttonStyle: React.CSSProperties = {
  padding: "12px 20px",
  background: "#3b82f6",
  color: "white",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "500",
  width: "fit-content",
  transition: "all 0.2s",
};

// Search Bar
export const searchBarStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginBottom: "16px",
  alignItems: "center",
};

export const searchInputStyle: React.CSSProperties = {
  flex: "1",
  padding: "10px 14px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  color: "#1f2937",
  fontSize: "14px",
  transition: "all 0.2s",
};

export const searchButtonStyle: React.CSSProperties = {
  padding: "10px 16px",
  background: "#3b82f6",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

export const clearButtonStyle: React.CSSProperties = {
  padding: "10px 12px",
  background: "#6b7280",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  transition: "all 0.2s",
};

// Compact Filters
export const compactFiltersStyle: React.CSSProperties = {
  position: "relative",
  marginBottom: "16px",
};

export const filterToggleStyle: React.CSSProperties = {
  padding: "8px 16px",
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  color: "#374151",
  transition: "all 0.2s",
  display: "flex",
  alignItems: "center",
};

export const filterDropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  padding: "16px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  zIndex: 10,
  display: "grid",
  gap: "12px",
};

export const filterItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

// Compact Table
export const compactTableStyle: React.CSSProperties = {
  background: "white",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
};

export const tableRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderBottom: "1px solid #f3f4f6",
  transition: "background-color 0.2s",
};

export const tableCellStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  fontSize: "14px",
};

export const statusBadgeStyle: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "500",
  textAlign: "center",
  minWidth: "60px",
};

export const priorityBadgeStyle: React.CSSProperties = {
  padding: "4px 8px",
  borderRadius: "4px",
  fontSize: "12px",
  fontWeight: "500",
  background: "#f3f4f6",
  color: "#374151",
  textAlign: "center",
  minWidth: "30px",
};

export const actionButtonsStyle: React.CSSProperties = {
  display: "flex",
  gap: "4px",
  flexWrap: "wrap",
};

// Create Toggle
export const createToggleStyle: React.CSSProperties = {
  position: "relative",
  marginBottom: "16px",
};

export const createButtonStyle: React.CSSProperties = {
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  background: "#3b82f6",
  color: "white",
  border: "none",
  cursor: "pointer",
  fontSize: "24px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "all 0.2s",
};

export const createFormContainerStyle: React.CSSProperties = {
  position: "absolute",
  top: "60px",
  left: 0,
  right: 0,
  background: "white",
  border: "1px solid #d1d5db",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  zIndex: 20,
};

export const resultsInfoStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
  marginBottom: "16px",
  color: "#6b7280",
  fontSize: "14px",
  fontWeight: "500",
};

export const tableContainerStyle: React.CSSProperties = {
  overflowX: "auto",
  className: "table-container",
};

export const tableHeaderStyle: React.CSSProperties = {
  background: "#f9fafb",
};

export const actionButtonStyle: React.CSSProperties = {
  padding: "6px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "white",
  cursor: "pointer",
  marginRight: "8px",
  color: "#374151",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "12px",
  fontWeight: "500",
  transition: "all 0.2s",
};

export const editButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  background: "#3b82f6",
  borderColor: "#2563eb",
  color: "white",
};

export const toggleButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  background: "#f59e0b",
  borderColor: "#d97706",
  color: "white",
};

export const deleteButtonStyle: React.CSSProperties = {
  ...actionButtonStyle,
  background: "#ef4444",
  borderColor: "#dc2626",
  color: "white",
};

export const messageStyle: React.CSSProperties = {
  color: "#10b981",
  fontSize: "14px",
  fontWeight: "500",
  padding: "8px 12px",
  background: "#ecfdf5",
  border: "1px solid #a7f3d0",
  borderRadius: "6px",
};

export const errorStyle: React.CSSProperties = {
  color: "#ef4444",
  fontSize: "14px",
  fontWeight: "500",
  padding: "8px 12px",
  background: "#fef2f2",
  border: "1px solid #fecaca",
  borderRadius: "6px",
};

export const loadingStyle: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "16px",
  textAlign: "center",
  padding: "40px",
};