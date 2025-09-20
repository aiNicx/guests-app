import Link from "next/link";
import {
  headerStyle,
  headerTitleStyle,
  headerSubtitleStyle,
  headerActionsStyle,
  linkStyle,
  logoutButtonStyle,
} from "../styles/globalStyles";

interface HeaderProps {
  email: string | null;
  onLogout: () => void;
}

export default function Header({ email, onLogout }: HeaderProps) {
  return (
    <header style={headerStyle}>
      <div>
        <h1 style={headerTitleStyle}>Dashboard Contenuti</h1>
        <div style={headerSubtitleStyle}>
          {email ? `Loggato come ${email}` : "—"}
        </div>
      </div>
      <div style={headerActionsStyle} className="header-actions">
        <Link href="/" style={linkStyle}>
          Vai al sito
        </Link>
        <button onClick={onLogout} style={logoutButtonStyle}>
          Logout
        </button>
      </div>
    </header>
  );
}