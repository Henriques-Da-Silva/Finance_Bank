import Header from '../components/header'
import Footer from '../components/footer'
import Sidebar from '../components/sidebar'
import { useState } from "react";


export default function Dashboard() {
    const [open, setOpen] = useState(false)
    
    return (
        <>
            <Header open={open} onMenuClick={() => setOpen(!open)} />
            <div className='flex h-[calc(100vh-4rem)] w-screen overflow-hidden'>
                <Sidebar open={open} onClose={() => setOpen(false)} />

                <main>
                    <h1>Dashboard</h1>
                    <Footer />
                </main>
            </div>
        </>
    )

}