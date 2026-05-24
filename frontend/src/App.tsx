import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from './pages/dashboard.tsx';
import Extrato from "./pages/extrato.tsx";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/extrato" element={<Extrato />} />
      </Routes>
    </BrowserRouter>   
  )

}