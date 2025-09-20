import { useEffect, useState } from "react";

export function useAdminToken() {
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    const exp = Number(localStorage.getItem("adminTokenExpiresAt") || 0);
    if (!t || !exp || Date.now() > exp) {
      setToken(null);
    } else {
      setToken(t);
    }
  }, []);
  
  return token;
}

export function useAdminEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("adminEmail");
    setEmail(storedEmail);
  }, []);

  return email;
}