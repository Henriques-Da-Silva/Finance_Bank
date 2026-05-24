import PageBase from "../components/anypageBase";

import { FiArrowUpRight, FiArrowDownLeft } from "react-icons/fi";


export default function Extrato() {
    

    return (
        <PageBase>
            <div className="flex justify-between">
                <h1 className="text-xl md:text-2xl font-bold">Extrato</h1>
                <div className="flex gap-2">
                    <select title="Filtrar por tipo" className="border rounded-lg border-gray-300 px-3 py-1 font-black text-sm hover:bg-surface hover:cursor-pointer">
                        <option value="">Filtrar</option>
                        <option value="saidas">Saídas</option>
                        <option value="entradas">Entradas</option>
                    </select>
                    <button className="border rounded-lg border-gray-300 px-3 py-1 font-black text-sm hover:bg-surface hover:cursor-pointer">
                        Exportar
                    </button>
                </div>
            </div>

            <div className="border rounded-2xl border-gray-200 p-4 md:p-6 bg-surface divide-y divide-gray-200 flex flex-col gap-4">
                {/* Transação 1 - Saída */}
                <div className="flex items-center justify-between py-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                            <p className="text-red-600 text-sm"> <FiArrowUpRight /> </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900">Transferência para Maria Silva</p>
                            <p className="text-xs text-gray-500">23/09/2024</p>
                        </div>
                    </div>
                    <p className="text-xs md:text-sm font-medium text-red-600">KZS 150,00</p>
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
                    <p className="text-xs md:text-sm font-medium text-green-600">+KZS 5.500,00</p>
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
                    <p className="text-xs md:text-sm font-medium text-red-600">KZS 850,00</p>
                </div>
            </div>
        </PageBase>
    )
}