import React from 'react'
import Navbar from './components/navbar'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-1 flex-col">
            <Navbar />
            <div className="container flex flex-1 p-10">{children}</div>
        </div>
    )
}
