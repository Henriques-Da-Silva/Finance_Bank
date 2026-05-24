import { useState } from "react";
import PageBase from "../components/anypageBase";
import { useAuth } from "../context/AuthContext"

import { FiEye, FiEyeOff } from "react-icons/fi";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiSend, FiCreditCard, FiTrendingUp, FiSmartphone, FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";


export default function Dashboard() {
    const { usuario } = useAuth()
    const [ visible, setVisible ] = useState(true)

    return (
        <PageBase>
            <div className="flex flex-col gap-2">
                <h1 className="text-xl md:text-2xl font-bold">Olá, { usuario?.nome || "Usuário" }!</h1>
                <p className='text-gray-500 text-xs md:text-sm font-normal'>Bem-vindo ao seu banco digital</p>
            </div>

            <div className="flex flex-wrap gap-6 text-white">
                <div className="flex flex-col justify-between h-47 w-full md:w-[calc(50%-12px)] px-6 py-8 bg-linear-to-r from-blue-700 to-purple-600 rounded-2xl">
                    <div className="flex justify-between">
                        <h3>Conta Principal</h3>
                        <button 
                            className="p-2 rounded-lg hover:bg-purple-500 hover:text-black hover:cursor-pointer duration-300" 
                            onClick={() => setVisible(!visible)}> { visible ? <FiEye /> : <FiEyeOff /> }</button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-200">Saldo Disponível</h3>
                        <p className="text-3xl font-black">KZS { visible ? "1000,00" : "******" }</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between h-47 w-full md:w-[calc(50%-12px)] px-6 py-8 bg-linear-to-r from-green-500 to-teal-600 rounded-2xl">
                    <div className="flex justify-between">
                        <h3>Poupança</h3>
                        <FaArrowTrendUp />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm text-gray-200">Valor investido</h3>
                        <p className="text-3xl font-black">KZS { visible ? "400,00" : "******" }</p>
                    </div>
                </div>
            </div>

            <div className="border rounded-2xl border-gray-300 p-6 bg-surface">
                <h3 className="text-md font-medium text-gray-900 mb-12">Ações rápidas</h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    <button className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiSend />
                        <span className="text-sm font-medium">Transferir</span>
                    </button>

                    <button className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiCreditCard />
                        <span className="text-sm font-medium">Pagar conta</span>
                    </button>

                    <button className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiTrendingUp />
                        <span className="text-sm font-medium">Investir</span>
                    </button>

                    <button className="border flex flex-col items-center justify-center gap-2 p-4 rounded-lg border-gray-300 hover:bg-gray-200 hover:cursor-pointer transition-colors duration-200">
                        <FiSmartphone />
                        <span className="text-sm font-medium">Recarga</span>
                    </button>
                </div>
            </div>

            <div className="border rounded-2xl border-gray-200 p-6 bg-surface">
                <div className="flex items-center justify-between mb-12">
                    <h3 className="text-sm font-medium text-gray-900">Últimas transações</h3>

                    <button className="text-sm font-medium hover:bg-gray-200 px-3 py-1 rounded-lg transition-colors duration-200 hover:cursor-pointer">
                        Ver todas
                    </button>
                </div>

                <div className="divide-y divide-gray-200 flex flex-col gap-4">
                    {/* Transação 1 - Saída */}
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <p className="text-red-600 text-sm"> <FiArrowUpRight /> </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Transferência IBAN para Maria Silva</p>
                                <p className="text-xs text-gray-500">23/09/2024</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-red-600">KZS 150,00</p>
                    </div>

                    {/* Transação 2 - Entrada */}
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <p className="text-green-600 text-sm"> <FiArrowDownLeft /> </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Salário - Empresa XYZ</p>
                                <p className="text-xs text-gray-500">22/09/2024</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-green-600">+KZS 5.500,00</p>
                    </div>

                    {/* Transação 3 - Saída */}
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <p className="text-red-600 text-sm"> <FiArrowUpRight /> </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Pagamento Conta da Água</p>
                                <p className="text-xs text-gray-500">21/09/2024</p>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-red-600">KZS 850,00</p>
                    </div>
                </div>
            </div>
        </PageBase>
    )
}