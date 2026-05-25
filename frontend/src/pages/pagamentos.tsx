import PageBase from "../components/anypageBase";

export default function Pagamentos() {
    const ultimosPagamentos = [
        { nome: "Energia Elétrica", data: "25/09/2024", valor: "185,50" },
        { nome: "Internet Fibra", data: "28/09/2024", valor: "99,90" },
        { nome: "Cartão Mastercard", data: "30/09/2024", valor: "450,00" },
    ];
    
    return (
        <PageBase>
            <h1 className="text-2xl font-semibold mb-6">Pagamentos</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-surface border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                    <h3 className="text-base font-semibold mb-5">Energia</h3>
                    <p className="text-sm text-gray-500 mb-6">Pague sua conta de energia elétrica sem precisar sair de casa!</p>
                    <button className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors cursor-pointer">
                    Pagar
                    </button>
                </div>

                <div className="bg-surface border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                    <h3 className="text-base font-semibold mb-5">Água</h3>
                    <p className="text-sm text-gray-500 mb-6">Quite sua fatura de água</p>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    Pagar
                    </button>
                </div>

                <div className="bg-surface border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                    <h3 className="text-base font-semibold text-gray-900 mb-2">Internet</h3>
                    <p className="text-sm text-gray-500 mb-6">Carregue a sua internet</p>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    Pagar
                    </button>
                </div>

                <div className="bg-surface border border-gray-200 rounded-xl p-6 flex flex-col justify-between">
                    <h3 className="text-base font-semibold text-gray-900 mb-6">Recargas</h3>
                    <p className="text-sm text-gray-500 mb-8">Recargas para Unitel ou Africell</p>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                    Pagar
                    </button>
                </div>
            </div>

            <div className="bg-surface border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-semibold mb-12">Últimos Pagamentos</h3>
                
                <div className="space-y-3">
                    {ultimosPagamentos.map((pagamento) => (
                    <div
                        key={pagamento.nome}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div>
                            <p className="text-sm font-semibold text-gray-900 mb-1">{pagamento.nome}</p>
                            <p className="text-xs text-gray-500">Pago aos: {pagamento.data}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">Kz {pagamento.valor}</p>
                    </div>
                    ))}
                </div>
            </div>
        </PageBase>
    )
}