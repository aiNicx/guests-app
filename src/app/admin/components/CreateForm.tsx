import { useState } from "react";
import {
  sectionStyle,
  sectionTitleStyle,
  formStyle,
  inputStyle,
  buttonStyle,
  messageStyle,
  errorStyle,
} from "../styles/globalStyles";

interface CreateFormProps {
  onSubmit: (category: string, subcategory: string) => Promise<void>;
  message: string | null;
  error: string | null;
}

export default function CreateForm({ onSubmit, message, error }: CreateFormProps) {
  const [formData, setFormData] = useState({ category: "", subcategory: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData.category.trim(), formData.subcategory.trim());
    setFormData({ category: "", subcategory: "" });
  };

  return (
    <section style={sectionStyle}>
      <h2 style={sectionTitleStyle}>Crea contenuto (minimo)</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Categoria"
          value={formData.category}
          onChange={(e) => setFormData((s) => ({ ...s, category: e.target.value }))}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Sottocategoria"
          value={formData.subcategory}
          onChange={(e) => setFormData((s) => ({ ...s, subcategory: e.target.value }))}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          Crea
        </button>
        {message && <div style={messageStyle}>{message}</div>}
        {error && <div style={errorStyle}>{error}</div>}
      </form>
    </section>
  );
}