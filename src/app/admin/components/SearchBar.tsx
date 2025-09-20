import { useState } from "react";
import {
  searchBarStyle,
  searchInputStyle,
  searchButtonStyle,
  clearButtonStyle,
} from "../styles/globalStyles";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, onClear, placeholder = "Cerca contenuti..." }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  return (
    <form onSubmit={handleSearch} style={searchBarStyle} className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={searchInputStyle}
        className="search-input"
      />
      <button type="submit" style={searchButtonStyle}>
        Cerca
      </button>
      {query && (
        <button type="button" onClick={handleClear} style={clearButtonStyle}>
          ×
        </button>
      )}
    </form>
  );
}