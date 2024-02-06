'use client'
import Link from 'next/link'
import React from 'react'
import LucideIcon, { LucideIconName } from '../icons/lucide-icon'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface SidebarItemProps {
    children: React.ReactNode
    href: string
    icon: LucideIconName
}

export default function SidebarItem({ children, href, icon }: SidebarItemProps) {
    const pathname = usePathname()
    return (
        <Link
            href={href}
            className={twMerge(
                'hover:text-fastapp-500 flex items-center rounded-lg px-4 py-2 font-medium text-gray-600 transition hover:bg-gray-100/80',
                pathname === href && 'text-fastapp-500 bg-gray-100/80'
            )}
        >
            <LucideIcon
                name={icon}
                size={20}
                className="mr-2"
            />
            {children}
        </Link>
    )
}
