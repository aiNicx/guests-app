import Link from "next/link";
import type { Id } from "../../../../convex/_generated/dataModel";
import {
  compactTableStyle,
  tableRowStyle,
  tableCellStyle,
  statusBadgeStyle,
  priorityBadgeStyle,
  actionButtonsStyle,
  editButtonStyle,
  toggleButtonStyle,
  deleteButtonStyle,
  loadingStyle,
} from "../styles/globalStyles";

interface Content {
  _id: string;
  _creationTime: number;
  category: string;
  subcategory: string;
  title?: string;
  isActive?: boolean;
  priority?: number;
}

interface CompactTableProps {
  contents: Content[] | undefined;
  filteredContents: Content[];
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export default function CompactTable({
  contents,
  filteredContents,
  onToggleActive,
  onDelete,
}: CompactTableProps) {
  if (!contents) {
    return <div style={loadingStyle}>Caricamento...</div>;
  }

  if (filteredContents.length === 0) {
    return <div style={loadingStyle}>Nessun contenuto trovato.</div>;
  }

  return (
    <div style={compactTableStyle}>
      <div style={{ display: 'grid', gap: '8px' }}>
        {filteredContents.map((content) => (
          <div key={content._id} style={tableRowStyle} className="compact-table-row">
            <div style={{ ...tableCellStyle, flex: '1' }} className="compact-table-cell">
              <div style={{ fontWeight: '600', color: '#1f2937' }}>
                {content.category} / {content.subcategory}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>
                {content.title || 'Senza titolo'}
              </div>
            </div>
            
            <div style={{ ...tableCellStyle, width: '100px' }} className="compact-table-cell">
              <span style={{
                ...statusBadgeStyle,
                background: content.isActive ? '#dcfce7' : '#fef2f2',
                color: content.isActive ? '#166534' : '#991b1b',
              }} className="status-badge">
                {content.isActive ? 'Attivo' : 'Inattivo'}
              </span>
            </div>
            
            <div style={{ ...tableCellStyle, width: '80px' }} className="compact-table-cell">
              <span style={priorityBadgeStyle} className="priority-badge">
                {content.priority ?? 0}
              </span>
            </div>
            
            <div style={{ ...tableCellStyle, width: '200px' }} className="compact-table-cell">
              <div style={actionButtonsStyle} className="compact-table-actions">
                <Link
                  href={`/admin/edit/${content._id}`}
                  style={editButtonStyle}
                  title="Modifica"
                >
                  Modifica
                </Link>
                <button
                  onClick={() => onToggleActive(content._id, content.isActive ?? false)}
                  style={toggleButtonStyle}
                  title="Toggle"
                >
                  Toggle
                </button>
                <button
                  onClick={() => onDelete(content._id)}
                  style={deleteButtonStyle}
                  title="Elimina"
                >
                  Elimina
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}