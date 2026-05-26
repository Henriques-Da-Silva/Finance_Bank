import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TbEye, TbEyeOff } from "react-icons/tb"
import { useAuth } from "../context/AuthContext"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro("")
    setCarregando(true)

    try {
      await login(email, senha)
      navigate("/dashboard")
    } catch (err) {
      setErro("E-mail ou senha incorretos")
      console.error(err)
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-xl p-9 w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-xl font-medium text-gray-900">FinanceBank</p>
          <p className="text-sm text-gray-500 mt-1">Bem-vindo de volta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {erro}
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">E-mail</label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-600">Senha</label>
              <a href="#" className="text-xs text-blue-600 hover:text-blue-700">Esqueceu a senha?</a>
            </div>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="••••••••"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full px-4 py-2.5 pr-10 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {mostrarSenha ? <TbEyeOff size={18} /> : <TbEye size={18} />}
              </button>
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={carregando}
            className="mt-2 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {carregando ? "Entrando..." : "Entrar"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Não tem conta?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            Criar conta
          </Link>
        </p>

      </div>
    </div>
  )
}