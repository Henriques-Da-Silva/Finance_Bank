import { Link } from "react-router-dom";

import { FiHome } from "react-icons/fi";
import { BiMoneyWithdraw } from "react-icons/bi";

export default function Sidebar() {
    return (
        <aside>
            <nav>
                <Link to={"/dashboard"}><FiHome /> <p>Início</p></Link>
                <Link to={"/extrato"}><BiMoneyWithdraw /> <p>Extrato</p></Link>
            </nav>
        </aside>
    )
}