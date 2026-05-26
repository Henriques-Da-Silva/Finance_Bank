import { useState, useEffect } from "react";
import PageBase from "../components/anypageBase";
import { useAuth } from "../context/AuthContext"
import api from "../services/api"
import { useNavigate } from "react-router-dom";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiSend, FiCreditCard, FiTrendingUp, FiSmartphone, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";
import type { Cartao, Transacao } from "../types";

export default function Dashboard() {
    const { usuario } = useAuth()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(true)
    const [cartoes, setCartoes] = useState<Cartao[]>([])
    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [carregando, setCarregando] = useState(true)

    useEffect(() => {
        async function buscarDados() {
            try {
                const { data: cartoesData } = await api.get("/cartoes/")
                setCartoes(cartoesData)

                if (cartoesData.length > 0) {
                    const { data: transacoesData } = await api.get(`/transacoes/${cartoesData[0].id}`)
                    setTransacoes(transacoesData.slice(0, 5))
                }
            } catch (err) {
                console.log(err)
            } finally {
                setCarregando(false)
            }
        }
        buscarDados()
    }, [])

    const tiposEntrada = ["DEPOSIT", "TRANSFER_IN", "INVESTMENT_IN"]

    function formatarValor(valor: number) {
        return valor.toLocaleString("pt-AO", { minimumFractionDigits: 2 })
    }

    function formatarData(data: string) {
        return new Date(data).toLocaleDateString("pt-AO")
    }

    function labelTransacao(tipo: string) {
        const labels: Record<string, string> = {
            DEPOSIT:        "Depósito recebido",
            TRANSFER_OUT:   "Transferência enviada",
            TRANSFER_IN:    "Transferência recebida",
            PAYMENT:        "Pagamento efetuado",
            RECHARGE:       "Recarga efetuada",
            INVESTMENT_OUT: "Investimento aplicado",
            INVESTMENT_IN:  "Investimento resgatado",
        }
        return labels[tipo] ?? tipo
    }

    const cartaoPrincipal = cartoes[0]
    const totalInvestido = cartoes.reduce((acc, c) => acc + Number(c.saldo_bloqueado), 0)

    return (
        <PageBase>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl md:text-2xl font-bold">Olá, {usuario?.nome || "Usuário"}!</h1>
                <p className="text-gray-500 text-xs md:text-sm font-normal">Bem-vindo ao seu banco digital</p>
            </div>

            {/* Cards de saldo */}
            <div className="flex flex-wrap gap-6 text-white">
                <div className="flex flex-col justify-between h-47 w-full md:w-[calc(50%-12px)] px-6 py-8 bg-linear-to-r from-blue-700 to-purple-600 rounded-2xl">
                    <div className="flex justify-between">
                        <h3>{cartaoPrincipal?.apelido || "Conta Principal"}</h3>
                        <button
                            className="p-2 rounded-lg hover:bg-purple-500 hover:cursor-pointer duration-300"
                            onClick={() => setVisible(!visible)}>
                            {visible ? <FiEye /> : <FiEyeOff />}
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-200">Saldo Disponível</h3>
                        <p className="text-3xl font-black">
                            {carregando ? "..." : visible ? `KZS ${formatarValor(Number(cartaoPrincipal?.saldo_disponivel ?? 0))}` : "KZS ******"}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between h-47 w-full md:w-[calc(50%-12px)] px-6 py-8 bg-linear-to-r from-green-500 to-teal-600 rounded-2xl">
                    <div className="flex justify-between">
                        <h3>Investimentos</h3>
                        <FaArrowTrendUp />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-200">Valor investido</h3>
                        <p className="text-3xl font-black">
                            {carregando ? "..." : visible ? `KZS ${formatarValor(totalInvestido)}` : "KZS ******"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Ações rápidas */}
            <div className="border rounded-2xl border-gray-300 p-6 bg-surface">
                <h3 className="text-md font-medium text-gray-900 mb-12">Ações rápidas</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <button onClick={() => navigate("/transferir")} className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiSend />
                        <span className="text-sm font-medium">Transferir</span>
                    </button>
                    <button onClick={() => navigate("/pagamentos")} className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiCreditCard />
                        <span className="text-sm font-medium">Pagar conta</span>
                    </button>
                    <button onClick={() => navigate("/investimentos")} className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiTrendingUp />
                        <span className="text-sm font-medium">Investir</span>
                    </button>
                    <button onClick={() => navigate("/pagamentos")} className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiSmartphone />
                        <span className="text-sm font-medium">Recarga</span>
                    </button>
                </div>
            </div>

            {/* Últimas transações */}
            <div className="border rounded-2xl border-gray-200 p-6 bg-surface">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-medium text-gray-900">Últimas transações</h3>
                    <button onClick={() => navigate("/extrato")} className="text-sm font-medium hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors duration-200 hover:cursor-pointer">
                        Ver todas
                    </button>
                </div>

                {carregando ? (
                    <p className="text-sm text-gray-400 text-center py-6">Carregando...</p>
                ) : transacoes.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-6">Nenhuma transação encontrada</p>
                ) : (
                    <div className="divide-y divide-gray-200 flex flex-col">
                        {transacoes.map((t) => {
                            const isEntrada = tiposEntrada.includes(t.tipo)
                            return (
                                <div key={t.id} className="flex items-center justify-between py-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isEntrada ? "bg-green-100" : "bg-red-100"}`}>
                                            <p className={`text-sm ${isEntrada ? "text-green-600" : "text-red-600"}`}>
                                                {isEntrada ? <FiArrowDownLeft /> : <FiArrowUpRight />}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{t.descricao || labelTransacao(t.tipo)}</p>
                                            <p className="text-xs text-gray-500">{t.created_at ? formatarData(t.created_at) : "-"}</p>
                                        </div>
                                    </div>
                                    <p className={`text-xs md:text-sm font-medium ${isEntrada ? "text-green-600" : "text-red-600"}`}>
                                        {isEntrada ? "+" : "-"}KZS {formatarValor(Number(t.valor))}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </PageBase>
    )
}