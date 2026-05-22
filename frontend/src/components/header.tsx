import { useAuth } from "../context/AuthContext"
import { FiMenu } from "react-icons/fi";
import { RiCloseLargeFill } from "react-icons/ri";

interface HeaderProps {
    open: boolean
  onMenuClick: () => void
}

export default function Header({ open, onMenuClick }: HeaderProps) {

    const { usuario } = useAuth()
    
    if (usuario?.nome) {
        const parts = usuario?.nome.split(" ").map((n) => n[0]).join("")
        var letras = (parts[0] + parts[parts.length -1]).toUpperCase()
    }

    return (
        <> 
            <header className="sticky top-0 z-5000 flex h-16 w-screen items-center justify-between bg-surface px-4 py-2 border-b border-gray-300">
                <div className="flex items-center gap-4">
                    <button className="md:hidden text-2xl" onClick={onMenuClick}> {!open ? <FiMenu /> : <RiCloseLargeFill />} </button>

                    <div className="flex flex-col gap-0">
                        <h1 className="text-primary text-xl md:text-2xl font-bold">FinanceBank</h1>
                        <p className="text-gray-500 text-xs md:text-sm">Seu Banco Digital</p>
                    </div>
                </div>

                <div className="flex gap-1 items-center">
                    <h2 className="text-gray-700 hidden md:block">{usuario?.nome || "Usuário"}</h2>
                    <h2 className="bg-primary text-white rounded-full w-8 h-8 p-1 flex items-center justify-center">{letras || "U"}</h2>
                </div>
            </header>
        </>
    )
}