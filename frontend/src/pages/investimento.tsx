import PageBase from "../components/anypageBase";

import { FaArrowTrendUp } from "react-icons/fa6";


export default function Investimento() {
  return (
    <PageBase>
        <h1 className="text-2xl font-semibold mb-6">Investimentos</h1>

        <div className="flex flex-col justify-between gap-10 w-full px-6 py-8 bg-linear-to-b from-green-500 to-teal-600 rounded-2xl text-white">
            <div className="flex justify-between">
                <h3>Patrimônio Total</h3>
                <FaArrowTrendUp />
            </div>
            <p className="text-3xl font-black">KZS 400,00</p>
            <p className="text-sm text-gray-200">Rentabilidade: +1% no mês</p>
        </div>

        <div className="bg-surface border border-gray-200 rounded-xl p-6 mt-6">
            <h3 className="text-base font-semibold mb-6">Produtos disponíveis</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">Bodiva</h4>
                        <p className="text-sm text-gray-500 mb-3">Rendimento: 12% por mês</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-lg w-fit">
                                Baixo risco
                            </span>
                            <p className="text-xs text-gray-500">Min: KZS 8000</p>
                        </div>
                        <button className="bg-black text-white text-sm font-medium px-2.5 py-2 h-fit rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            Investir
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">BAI</h4>
                        <p className="text-sm text-gray-500 mb-3">Rendimento: 3% por mês</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-lg w-fit">
                                Médio risco
                            </span>
                            <p className="text-xs text-gray-500">Min: KZS 5000</p>
                        </div>
                        <button className="bg-black text-white text-sm font-medium px-2.5 py-2 h-fit rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            Investir
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">BFA</h4>
                        <p className="text-sm text-gray-500 mb-3">Rendimento: 6% por mês</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-lg w-fit">
                                Baixo risco
                            </span>
                            <p className="text-xs text-gray-500">Min: KZS 15000</p>
                        </div>
                        <button className="bg-black text-white text-sm font-medium px-2.5 py-2 h-fit rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            Investir
                        </button>
                    </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-5 flex flex-col justify-between">
                    <div>
                        <h4 className="text-sm font-semibold mb-2">BCI</h4>
                        <p className="text-sm text-gray-500 mb-3">Rendimento: 5% por mês</p>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-2 mb-1">
                            <span className="text-xs px-2 py-0.5 border border-gray-300 rounded-lg w-fit">
                                Médio risco
                            </span>
                            <p className="text-xs text-gray-500">Min: KZS 8000</p>
                        </div>
                        <button className="bg-black text-white text-sm font-medium px-2.5 py-2 h-fit rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            Investir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </PageBase>
  );
}