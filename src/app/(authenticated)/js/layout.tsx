import React from 'react'
import Navbar from './components/navbar'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-1 flex-col">
            <Navbar />
            <div className="flex flex-1 justify-center py-6 md:py-10">
                <div className="w-full px-6 md:w-8/12 md:p-0 lg:w-8/12">{children}</div>
            </div>
        </div>
    )
}
