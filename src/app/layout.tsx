import type { Metadata, Viewport } from "next";
import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Case Vacanza",
  description: "Info utili per gli ospiti",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
