import { useState } from "react";
import PageBase from "../components/anypageBase";

import { FiEye, FiEyeOff } from "react-icons/fi";


export default function Cartoes() {
    const [ visible, setVisible ] = useState(true)
    

    return (
        <PageBase>
            <h1 className="text-2xl font-semibold mb-6">Cartões</h1>

            <div className="flex flex-col gap-4 md:gap-6 bg-surface p-4 md:p-6 rounded-xl border border-gray-300 divide-y divide-gray-400">
                {/*Cartão 1*/}
                <div className="flex gap-6 flex-wrap py-6">
                    <div className="text-white rounded-xl bg-linear-to-b from-zinc-700 to-gray-900 p-4 md:p-6 w-full md:w-[calc(50%-12px)] flex flex-col gap-8 md:gap-12">
                        <div>
                            <h3 className="text-md font-semibold text-gray-300">Cartão de Crédito</h3>
                            <h1 className="text-lg font-bold">Apelido do Cartão</h1>
                        </div>
                        <div>
                            <h1 className="text-md mb-8">IBAN: A006 0040 0000 4397 4567 7</h1>
                            <div className="flex justify-between mb-4 md:mb-8">
                                <div>
                                    <h1 className="text-sm text-gray-400">CRIADO AOS:</h1>
                                    <p className="text-sm">01/01/2020</p>
                                </div>
                                <h1 className="text-md text-gray-400 font-semibold">Usuário</h1>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-xl w-full md:w-[calc(50%-12px)] p-4 md:p-6 flex justify-between flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h1 className="font-black">Dados</h1>
                            <button className="p-2 rounded-lg hover:bg-gray-300 hover:text-black hover:cursor-pointer duration-300" onClick={() => setVisible(!visible)}> 
                                { visible ? <FiEye /> : <FiEyeOff /> } </button>
                        </div>

                        <div className="md:px-6">
                            <p className="flex justify-between"> 
                                <p>Saldo Contabilístico: </p> 
                                <span className="font-bold text-blue-500">KZS {!visible ? "****.**" : "0000.00"}</span>
                            </p>
                            <p className="flex justify-between">
                                <p>Saldo Disponível: </p>
                                <span className="font-bold text-blue-500">KZS {!visible ? "****.**" : "0000.00"}</span>
                            </p>
                            <p className="flex justify-between">
                                <p>Saldo Bloqueado: </p>
                                <span className="font-bold text-blue-500">KZS {!visible ? "****.**" : "0000.00"}</span>
                            </p>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <button className="border rounded-lg border-gray-300 px-3 py-1 font-black text-sm hover:bg-gray-200 hover:cursor-pointer">
                                Editar Apelido
                            </button>
                            <button className="border rounded-lg border-gray-300 px-3 py-1 font-black text-sm hover:bg-gray-200 hover:cursor-pointer">
                                Bloquear Cartão
                            </button>
                            <button className="rounded-lg bg-red-600 text-white px-3 py-1 text-sm hover:bg-red-500 hover:cursor-pointer">
                                Deletar Cartão
                            </button>
                        </div>
                    </div>
                </div>

                {/*Cartão 2*/}
                <div className="flex gap-6 flex-wrap py-6">
                    <div className="text-white rounded-xl bg-linear-to-b from-zinc-700 to-gray-900 p-4 md:p-6 w-full md:w-[calc(50%-12px)] flex flex-col gap-8 md:gap-12">
                        <div>
                            <h3 className="text-md font-semibold text-gray-300">Cartão de Crédito</h3>
                            <h1 className="text-lg font-bold">Apelido do Cartão</h1>
                        </div>
                        <div>
                            <h1 className="text-md mb-8">IBAN: A006 0040 0000 4397 4567 7</h1>
                            <div className="flex justify-between mb-4 md:mb-8">
                                <div>
                                    <h1 className="text-sm text-gray-400">CRIADO AOS:</h1>
                                    <p className="text-sm">01/01/2020</p>
                                </div>
                                <h1 className="text-md text-gray-400 font-semibold">Usuário</h1>
                            </div>
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-xl w-full md:w-[calc(50%-12px)] p-4 md:p-6 flex justify-between flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h1 className="font-black">Dados</h1>
                            <button className="p-2 rounded-lg hover:bg-gray-300 hover:text-black hover:cursor-pointer duration-300" onClick={() => setVisible(!visible)}> 
                                { visible ? <FiEye /> : <FiEyeOff /> } </button>
                        </div>

                        <div className="md:px-6">
                            <p className="flex justify-between"> 
                                <p>Saldo Contabilístico: </p> 
                                <span className="font-bold text-blue-500">KZS {!visible ? "****.**" : "0000.00"}</span>
                            </p>
                            <p className="flex justify-between">
                                <p>Saldo Disponível: </p>
                                <span className="font-bold text-blue-500">KZS {!visible ? "****.**" : "0000.00"}</span>
                            </p>
                            <p className="flex justify-between">
                                <p>Saldo Bloqueado: </p>
                                <span className="font-bold text-blue-500">KZS {!visible ? "****.**" : "0000.00"}</span>
                            </p>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <button className="border rounded-lg border-gray-300 px-3 py-1 font-black text-sm hover:bg-gray-200 hover:cursor-pointer">
                                Editar Apelido
                            </button>
                            <button className="border rounded-lg border-gray-300 px-3 py-1 font-black text-sm hover:bg-gray-200 hover:cursor-pointer">
                                Bloquear Cartão
                            </button>
                            <button className="rounded-lg bg-red-600 text-white px-3 py-1 text-sm hover:bg-red-500 hover:cursor-pointer">
                                Deletar Cartão
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PageBase>
    )
}