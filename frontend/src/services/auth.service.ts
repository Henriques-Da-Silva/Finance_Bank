// após o login, guarda o token
export function salvarToken(token: string) {
  localStorage.setItem("token", token)
}

// recupera o token
export function getToken(): string | null {
  return localStorage.getItem("token")
}

// remove o token (logout)
export function removerToken() {
  localStorage.removeItem("token")
}