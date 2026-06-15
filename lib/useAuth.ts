import { useState, useEffect } from "react";

export interface AuthUser {
  email: string;
  accessToken?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      const email = localStorage.getItem("userEmail");

      if (token && email) {
        setUser({ email, accessToken: token });
      }
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (for multi-tab sync)
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = (email: string, accessToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userEmail", email);
    setUser({ email, accessToken });
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userEmail");
      setUser(null);
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}
