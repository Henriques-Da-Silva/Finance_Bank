import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/dashboard.tsx';
import Extrato from "./pages/extrato.tsx";
import Transferir from "./pages/transferir.tsx";
import Pagamentos from "./pages/pagamentos.tsx";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrato" element={<Extrato />} />
        <Route path="/transferir" element={<Transferir />} />
        <Route path="/pagamentos" element={<Pagamentos />} />
      </Routes>
    </BrowserRouter>   
  )

}