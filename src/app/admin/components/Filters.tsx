import {
  filtersContainerStyle,
  filterInputStyle,
  clearFiltersButtonStyle,
} from "../styles/globalStyles";

interface FiltersProps {
  filters: {
    category: string;
    subcategory: string;
    title: string;
    active: 'true' | 'false' | '';
    priorityMin: string;
    priorityMax: string;
  };
  onFilterChange: (key: keyof FiltersProps['filters'], value: string) => void;
  onClearFilters: () => void;
}

export default function Filters({ filters, onFilterChange, onClearFilters }: FiltersProps) {
  return (
    <div style={filtersContainerStyle} className="filters-grid">
      <input
        type="text"
        placeholder="Filtra per categoria"
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
        style={filterInputStyle}
      />
      <input
        type="text"
        placeholder="Filtra per sottocategoria"
        value={filters.subcategory}
        onChange={(e) => onFilterChange('subcategory', e.target.value)}
        style={filterInputStyle}
      />
      <input
        type="text"
        placeholder="Filtra per titolo"
        value={filters.title}
        onChange={(e) => onFilterChange('title', e.target.value)}
        style={filterInputStyle}
      />
      <select
        value={filters.active}
        onChange={(e) => onFilterChange('active', e.target.value)}
        style={filterInputStyle}
      >
        <option value="">Tutti gli stati</option>
        <option value="true">Attivo</option>
        <option value="false">Non attivo</option>
      </select>
      <input
        type="number"
        placeholder="Priorità min"
        value={filters.priorityMin}
        onChange={(e) => onFilterChange('priorityMin', e.target.value)}
        style={filterInputStyle}
      />
      <input
        type="number"
        placeholder="Priorità max"
        value={filters.priorityMax}
        onChange={(e) => onFilterChange('priorityMax', e.target.value)}
        style={filterInputStyle}
      />
      <button onClick={onClearFilters} style={clearFiltersButtonStyle}>
        Pulisci filtri
      </button>
    </div>
  );
}