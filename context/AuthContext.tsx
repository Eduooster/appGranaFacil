import { deleteItem, getItem, saveItem } from "@/utils/utils";
import React, { createContext, useState, useContext, useEffect } from "react";


type User = {
  id: string;
  email: string;
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  user: User | null;
  authToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  signIn: (data: SignInCredentials) => Promise<boolean>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Inicialização
  useEffect(() => {
    async function loadAuth() {
      try {
        const token = await getItem("token");
        const refresh = await getItem("refresh_token");
        const storedUser = await getItem("user");

        if (token && refresh && storedUser) {
          setAuthToken(token);
          setRefreshToken(refresh);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error("Erro ao carregar auth:", err);
      } finally {
        setLoading(false);
      }
    }

    loadAuth();
  }, []);

  // 🔹 Login
  async function signIn({ email, password }: SignInCredentials): Promise<boolean> {
    try {
      setLoading(true);

      

      const response = await fetch("https://74185138c2c2.ngrok-free.app/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" ,'ngrok-skip-browser-warning': 'true'},
        body: JSON.stringify({ email, senha: password }),
      });

      if (!response.ok) throw new Error("Falha no login");

      const data = await response.json();

      console.log(data)

      if (!data.tokenJWT || !data.refresh_token) {
        throw new Error("Resposta inválida");
      }

      const loggedUser: User = { id: "1", email };

      await saveItem("token", data.tokenJWT);
      await saveItem("refresh_token", data.refresh_token);
      await saveItem("user", JSON.stringify(loggedUser));

      setAuthToken(data.tokenJWT);
      setRefreshToken(data.refresh_token);
      setUser(loggedUser);

      return true;
    } catch (err) {
      console.error("Erro no signIn:", err);
      return false;
    } finally {
      setLoading(false);
    }
  }

  // 🔹 Logout
  async function signOut() {
    setLoading(true);

    await deleteItem("token");
    await deleteItem("refresh_token");
    await deleteItem("user");

    setUser(null);
    setAuthToken(null);
    setRefreshToken(null);

    setLoading(false);
  }

  return (
    <AuthContext.Provider
      value={{ user, authToken, refreshToken, loading, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
