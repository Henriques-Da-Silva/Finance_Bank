// RegisterPage.tsx
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { TbEye, TbEyeOff } from "react-icons/tb"
import api from "../services/api"

export default function RegisterPage() {
  const [form, setForm] = useState({ nome: "", email: "", celular: "", senha: "" })
  const [mostrarSenha, setMostrarSenha] = useState(false)
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const navigate = useNavigate()

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErro("")
    setCarregando(true)

    try {
      await api.post("/usuarios/", form)
      navigate("/login")
    } catch (err: any) {
      const detail = err?.response?.data?.detail
      setErro(detail ?? "Erro ao criar conta. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white border border-gray-200 rounded-xl p-9 w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-8">
          <p className="text-xl font-medium text-gray-900">FinanceBank</p>
          <p className="text-sm text-gray-500 mt-1">Crie a sua conta</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Erro */}
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {erro}
            </div>
          )}

          {/* Nome */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Nome completo</label>
            <input
              type="text"
              name="nome"
              placeholder="João Silva"
              value={form.nome}
              onChange={handleChange}
              required
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900"
            />
          </div>

          {/* Celular */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Celular</label>
            <input
              type="tel"
              name="celular"
              placeholder="+244 900 000 000"
              value={form.celular}
              onChange={handleChange}
              required
              className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-900"
            />
          </div>

          {/* Senha */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="mín. 6 caracteres"
                value={form.senha}
                onChange={handleChange}
                required
                minLength={6}
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
            {carregando ? "Criando conta..." : "Criar conta"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            Entrar
          </Link>
        </p>

      </div>
    </div>
  )
}