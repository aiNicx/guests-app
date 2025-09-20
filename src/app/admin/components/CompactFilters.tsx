import { useState } from "react";
import {
  compactFiltersStyle,
  filterToggleStyle,
  filterDropdownStyle,
  filterItemStyle,
  activeFilterStyle,
} from "../styles/globalStyles";

interface CompactFiltersProps {
  onFilterChange: (key: 'status' | 'priority', value: string) => void;
  onClearFilters: () => void;
  activeFilters: Record<string, string>;
}

export default function CompactFilters({ onFilterChange, onClearFilters, activeFilters }: CompactFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = {
    status: [
      { value: '', label: 'Tutti gli stati' },
      { value: 'true', label: 'Attivo' },
      { value: 'false', label: 'Inattivo' },
    ],
    priority: [
      { value: '', label: 'Tutte le priorità' },
      { value: '1', label: 'Priorità 1' },
      { value: '2', label: 'Priorità 2' },
      { value: '3', label: 'Priorità 3' },
    ],
  };

  const activeCount = Object.values(activeFilters).filter(value => value !== '').length;

  return (
    <div style={compactFiltersStyle}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={filterToggleStyle}
      >
        Filtri {activeCount > 0 && `(${activeCount})`}
        <span style={{ marginLeft: '8px' }}>{isOpen ? '▲' : '▼'}</span>
      </button>
      
      {isOpen && (
        <div style={filterDropdownStyle}>
          <div style={filterItemStyle}>
            <label>Stato:</label>
            <select
              value={activeFilters.status || ''}
              onChange={(e) => onFilterChange('status', e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              {filterOptions.status.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <div style={filterItemStyle}>
            <label>Priorità:</label>
            <select
              value={activeFilters.priority || ''}
              onChange={(e) => onFilterChange('priority', e.target.value)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid #d1d5db' }}
            >
              {filterOptions.priority.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {activeCount > 0 && (
            <button onClick={onClearFilters} style={clearButtonStyle}>
              Pulisci filtri
            </button>
          )}
        </div>
      )}
    </div>
  );
}