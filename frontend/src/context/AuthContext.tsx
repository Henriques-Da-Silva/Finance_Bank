import { createContext, useContext, useState } from "react"
import { salvarToken, removerToken } from "../services/auth.service"
import type { Usuario } from "../types"
import api from "../services/api"

interface AuthContextType {
  usuario: Usuario | null
  login: (email: string, senha: string) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  async function login(email: string, senha: string) {
    // 1. faz o login e recebe o token
    const { data } = await api.post("/auth/login", { email, senha })
    
    // 2. guarda o token
    salvarToken(data.access_token)

    // 3. busca os dados do usuário com o token já guardado
    const { data: usuarioData } = await api.get("/usuarios/me")
    setUsuario(usuarioData)
  }

  function logout() {
    removerToken()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}