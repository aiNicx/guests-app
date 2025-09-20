import Link from "next/link";
import type { Id } from "../../../../convex/_generated/dataModel";
import {
  resultsInfoStyle,
  tableContainerStyle,
  tableHeaderStyle,
  editButtonStyle,
  toggleButtonStyle,
  deleteButtonStyle,
  loadingStyle,
} from "../styles/globalStyles";

interface Content {
  _id: string;
  category: string;
  subcategory: string;
  title?: string;
  isActive?: boolean;
  priority?: number;
}

interface ContentsTableProps {
  contents: Content[] | undefined;
  filteredContents: Content[];
  sort: { column: string; direction: 'asc' | 'desc' } | null;
  onSort: (column: string) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export default function ContentsTable({
  contents,
  filteredContents,
  sort,
  onSort,
  onToggleActive,
  onDelete,
}: ContentsTableProps) {
  if (!contents) {
    return <div style={loadingStyle}>Caricamento...</div>;
  }

  if (filteredContents.length === 0) {
    return <div style={loadingStyle}>Nessun contenuto trovato.</div>;
  }

  return (
    <>
      <div style={resultsInfoStyle}>
        Risultati: {filteredContents.length} di {contents.length}
      </div>
      
      <div style={tableContainerStyle} className="table-container">
        <table>
          <thead style={tableHeaderStyle}>
            <tr>
              <th onClick={() => onSort('category')}>
                Categoria {sort?.column === 'category' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => onSort('subcategory')}>
                Sottocategoria {sort?.column === 'subcategory' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => onSort('title')}>
                Titolo {sort?.column === 'title' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => onSort('isActive')}>
                Attivo {sort?.column === 'isActive' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th onClick={() => onSort('priority')}>
                Priorità {sort?.column === 'priority' && (sort.direction === 'asc' ? '↑' : '↓')}
              </th>
              <th>Azioni</th>
            </tr>
          </thead>
          <tbody>
            {filteredContents.map((c, index) => (
              <tr key={c._id}>
                <td>{c.category}</td>
                <td>{c.subcategory}</td>
                <td>{c.title || "-"}</td>
                <td>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    background: c.isActive ? "#dcfce7" : "#fef2f2",
                    color: c.isActive ? "#166534" : "#991b1b",
                  }}>
                    {c.isActive ? "Attivo" : "Inattivo"}
                  </span>
                </td>
                <td>
                  <span style={{
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    background: "#f3f4f6",
                    color: "#374151",
                  }}>
                    {c.priority ?? 0}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                    <Link
                      href={`/admin/edit/${c._id}`}
                      style={editButtonStyle}
                      title="Modifica contenuto"
                    >
                      Modifica
                    </Link>
                    <button
                      onClick={() => onToggleActive(c._id, c.isActive ?? false)}
                      style={toggleButtonStyle}
                      title="Toggle attivo"
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() => onDelete(c._id)}
                      style={deleteButtonStyle}
                      title="Elimina"
                    >
                      Elimina
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}