import React from 'react'
import { twMerge } from 'tailwind-merge'

interface NavbarGroupProps {
    children: React.ReactNode
    justify?: 'start' | 'end' | 'between'
    gap?: number
    className?: string
}

export default function NavbarGroup({ children, justify, gap, className }: NavbarGroupProps) {
    return (
        <div className={twMerge('flex items-center', justify && `justify-${justify}`, gap && `gap-${gap}`, className)}>
            {children}
        </div>
    )
}
