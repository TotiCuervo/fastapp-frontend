import React from 'react'

interface NavbarContainerProps {
    children: React.ReactNode
}
export default function NavbarContainer({ children }: NavbarContainerProps) {
    return (
        <nav className="mx-auto flex h-16 w-full items-center border-b border-gray-200 px-4 sm:px-6 lg:px-24">
            {children}
        </nav>
    )
}
