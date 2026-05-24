import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/dashboard.tsx';
import Extrato from "./pages/extrato.tsx";
import Transferir from "./pages/transferir.tsx";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrato" element={<Extrato />} />
        <Route path="/transferir" element={<Transferir />} />
      </Routes>
    </BrowserRouter>   
  )

}