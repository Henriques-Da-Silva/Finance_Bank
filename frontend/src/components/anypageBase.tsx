import Header from '../components/header'
import Sidebar from '../components/sidebar'
import React, { useState } from "react";

type PageProps = {
    children: React.ReactNode
}

export default function PageBase({ children }: PageProps) {
    const [open, setOpen] = useState(false)
    
    return (
        <>
            <Header open={open} onMenuClick={() => setOpen(!open)} />
            <div className='flex h-[calc(100vh-4rem)] w-screen overflow-hidden'>
                <Sidebar open={open} onClose={() => setOpen(false)} />
                <main className='flex flex-col flex-1 p-4 md:p-6 gap-6 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </>
    )
}