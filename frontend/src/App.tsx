import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/dashboard.tsx';
import Extrato from "./pages/extrato.tsx";
import Transferir from "./pages/transferir.tsx";
import Pagamentos from "./pages/pagamentos.tsx";
import Investimento from "./pages/investimento.tsx";
import Cartoes from "./pages/cartoes.tsx";
import Perfil from "./pages/perfil.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/Login.tsx";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrato" element={<Extrato />} />
        <Route path="/transferir" element={<Transferir />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
        <Route path="/investimentos" element={<Investimento />} />
        <Route path="/cartoes" element={<Cartoes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>   
  )

}