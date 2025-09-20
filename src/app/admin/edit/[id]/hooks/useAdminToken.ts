"use client";

import { useEffect, useState } from "react";

export function useAdminToken() {
  const [token, setToken] = useState<string | null>(() => {
    const t = localStorage.getItem("adminToken");
    const exp = Number(localStorage.getItem("adminTokenExpiresAt") || 0);
    if (!t || !exp || Date.now() > exp) {
      return null;
    }
    return t;
  });

  useEffect(() => {
    const t = localStorage.getItem("adminToken");
    const exp = Number(localStorage.getItem("adminTokenExpiresAt") || 0);
    if (!t || !exp || Date.now() > exp) {
      if (token !== null) setToken(null);
    } else {
      if (token !== t) setToken(t);
    }
  }, [token]);

  return token;
}