import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface NavbarItemProps {
    text: string
    href: string
}

export default function NavbarItem({ text, href }: NavbarItemProps) {
    const pathname = usePathname()
    const isActive = pathname === href

    return (
        <Link
            href={href}
            className={twMerge(
                'transition',
                isActive ? 'font-semibold text-gray-900' : 'text-gray-500 hover:text-gray-900'
            )}
        >
            {text}
        </Link>
    )
}
