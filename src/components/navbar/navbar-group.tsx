import React from 'react'
import { twMerge } from 'tailwind-merge'

interface NavbarGroupProps {
    children: React.ReactNode
    justify?: 'start' | 'end' | 'between'
    gap?: number
}

export default function NavbarGroup({ children, justify, gap }: NavbarGroupProps) {
    return (
        <div className={twMerge('flex w-full items-center', justify && `justify-${justify}`, gap && `gap-${gap}`)}>
            {children}
        </div>
    )
}
