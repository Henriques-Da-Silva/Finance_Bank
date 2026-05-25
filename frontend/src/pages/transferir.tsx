import PageBase from "../components/anypageBase";

import { FiArrowUpRight } from "react-icons/fi";

export default function Transferir() {
    const contatos = [
        { initials: "MS", nome: "Maria Silva", tipo: "PIX", info: "***@gmail.com" },
        { initials: "JS", nome: "João Santos", tipo: "Banco ABC", info: "*** ***-**" },
        { initials: "AC", nome: "Ana Costa", tipo: "PIX", info: "(11) 9****-****" },
    ];

    return (
        <PageBase>
            <h2 className="text-2xl font-black mb-6">Transferências</h2>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-surface border border-gray-200 rounded-xl p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-12">Express-Express</h3>
                    <p className="text-sm text-gray-500 mb-10">
                        Transfira instantaneamente usando número de telefone do destinatário.
                    </p>
                    <button className="w-full bg-black text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors cursor-pointer">
                        <FiArrowUpRight />
                        Mandar Agora
                    </button>
                </div>

                <div className="bg-surface border border-gray-200 rounded-xl p-6">
                    <h3 className="text-base font-semibold text-gray-900 mb-12">IBAN</h3>
                    <p className="text-sm text-gray-500 mb-10">
                        Transferência para outras pessoas usando seus numerários do IBAN.
                    </p>
                    <button className="w-full border border-gray-300 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                        Transferir
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-12">Contatos frequentes</h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                    {contatos.map((contato) => (
                    <button
                        key={contato.nome}
                        className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-all text-left cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <span className="text-sm font-semibold text-gray-700">{contato.initials}</span>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{contato.nome}</p>
                            <p className="text-xs text-gray-500">{contato.tipo}</p>
                            <p className="text-xs text-blue-600 truncate">{contato.info}</p>
                        </div>
                    </button>
                    ))}
                </div>
            </div>
        </PageBase>
    )
}