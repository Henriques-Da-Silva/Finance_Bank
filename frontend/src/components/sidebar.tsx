import { NavLink } from "react-router-dom";

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
  const isActive = location.pathname

  return (
    <>
      {open && ( <div className="fixed inset-0 bg-black/40 md:hidden" onClick={onClose} /> )}

      <aside className={`fixed md:static left-0 h-screen w-60 bg-surface border-r border-gray-300 transform transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"} overflow-hidden`}>
        <nav className="flex flex-col gap-2 h-full p-4">
          
          <NavLink onClick={onClose} to="/dashboard"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/dashboard" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><FiHome /></p>
            <p>Início</p>
          </NavLink>

          <NavLink onClick={onClose} to="/extrato"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/extrato" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><BiMoneyWithdraw /></p>
            <p>Extrato</p>
          </NavLink>

          <NavLink onClick={onClose} to="/transferir"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/transferir" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><LuSend /></p>
            <p>Transferir</p>
          </NavLink>

          <NavLink onClick={onClose} to="/pagamentos"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/pagamentos" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><FiCreditCard /></p>
            <p>Pagamentos</p>
          </NavLink>

          <NavLink onClick={onClose} to="/investimentos"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/investimentos" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><FaArrowTrendUp /></p>
            <p>Investimentos</p>
          </NavLink>

          <NavLink onClick={onClose} to="/cartoes"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/cartoes" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><FiCreditCard /></p>
            <p>Cartões</p>
          </NavLink>

          <NavLink onClick={onClose} to="/perfil"
            className={`flex gap-2 items-center px-4 py-3 rounded-xl ${isActive === "/perfil" ? "bg-black text-white" : "text-gray-600 hover:bg-gray-300 hover:text-black"}`} >
            <p className="text-2xl"><CgProfile /></p>
            <p>Perfil</p>
          </NavLink>

        </nav>
      </aside>
    </>
  );
}