import { Link } from "react-router-dom";

import { FiHome, FiCreditCard } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { LuSend } from "react-icons/lu";
import { FaArrowTrendUp } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";

interface SidebarProps {
  open: boolean
  onClose: () => void
}

export default function Sidebar({ open, onClose }: SidebarProps) {

  return (
    <>
      {open && ( <div className="fixed inset-0 bg-black/40 md:hidden" onClick={onClose} /> )}

      <aside className={`fixed md:static left-0 h-screen w-60 bg-surface border-r border-gray-300 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"} overflow-hidden`}>
        <nav className="flex flex-col gap-2 h-full p-4 overflow-y-auto">
          
          <Link onClick={onClose} to="/dashboard"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><FiHome /></p>
            <p>Início</p>
          </Link>

          <Link onClick={onClose} to="/extrato"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><BiMoneyWithdraw /></p>
            <p>Extrato</p>
          </Link>

          <Link onClick={onClose} to="/transferir"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><LuSend /></p>
            <p>Transferir</p>
          </Link>

          <Link onClick={onClose} to="/pagamentos"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><FiCreditCard /></p>
            <p>Pagamentos</p>
          </Link>

          <Link onClick={onClose} to="/investimentos"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><FaArrowTrendUp /></p>
            <p>Investimentos</p>
          </Link>

          <Link onClick={onClose} to="/cartoes"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><FiCreditCard /></p>
            <p>Cartões</p>
          </Link>

          <Link onClick={onClose} to="/perfil"
            className="flex gap-2 items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-gray-300 hover:text-black" >
            <p className="text-2xl"><CgProfile /></p>
            <p>Perfil</p>
          </Link>

        </nav>
      </aside>
    </>
  );
}