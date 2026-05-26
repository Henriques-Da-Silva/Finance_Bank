import PageBase from "../components/anypageBase";

import { FiLock, FiLogOut } from "react-icons/fi";


export default function Perfil() {


    return (
        <PageBase>
            <h1 className="text-2xl font-semibold mb-4">Perfil</h1>

            <div className="bg-surface border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-lg"> U </div>
                    
                    <div>
                        <h3 className="text-base font-semibold text-gray-900">Usuário</h3>
                        <p className="text-sm text-gray-500">usuario@email.com</p>
                        <p className="text-sm text-gray-500">Cel: 920 000 000</p>
                    </div>
                </div>

                <button className="w-full border border-gray-300 text-gray-900 text-sm font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                    Editar perfil
                </button>
            </div>


            <div className="bg-surface border border-gray-200 rounded-xl p-6">
                <h3 className="text-base font-semibold mb-4">Configurações</h3>
                
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <p className="w-5 h-5 text-gray-600"><FiLock /></p>
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Segurança</p>
                            <p className="text-xs text-gray-500">Alterar senha e PIN</p>
                        </div>
                    </div>
                    <button className="text-sm font-medium text-gray-900 hover:bg-gray-300 cursor-pointer rounded-lg px-1.5 py-1">
                        Gerenciar
                    </button>
                </div>

                <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center gap-3">
                        <p className="w-5 h-5 text-red-600"><FiLogOut /></p>
                        <div>
                            <p className="text-sm font-semibold text-red-600">Sair da conta</p>
                            <p className="text-xs text-gray-500">Desconectar do aplicativo</p>
                        </div>
                    </div>
                    <button className="text-sm font-medium text-red-600 hover:bg-gray-300 cursor-pointer rounded-lg px-1.5 py-1">
                        Sair
                    </button>
                </div>
            </div>
        </PageBase>
    )
}