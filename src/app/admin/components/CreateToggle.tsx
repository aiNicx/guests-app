import { useState } from "react";
import {
  createToggleStyle,
  createButtonStyle,
  createFormContainerStyle,
} from "../styles/globalStyles";

interface CreateToggleProps {
  children: React.ReactNode;
}

export default function CreateToggle({ children }: CreateToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={createToggleStyle}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={createButtonStyle}
        title={isOpen ? "Chiudi form creazione" : "Crea nuovo contenuto"}
      >
        {isOpen ? "✕" : "+"}
      </button>
      
      {isOpen && (
        <div style={createFormContainerStyle}>
          {children}
        </div>
      )}
    </div>
  );
}