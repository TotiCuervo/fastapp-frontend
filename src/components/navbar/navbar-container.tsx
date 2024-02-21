import React from 'react'

interface NavbarContainerProps {
    children: React.ReactNode
    noBorder?: boolean
}
export default function NavbarContainer({ children, noBorder }: NavbarContainerProps) {
    return (
        <nav className={`mx-auto flex h-16 w-full items-center ${!noBorder && 'border-b'} px-4 sm:px-6 lg:px-24`}>
            {children}
        </nav>
    )
}
