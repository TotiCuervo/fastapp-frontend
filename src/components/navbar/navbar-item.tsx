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
            className={twMerge('transition', !isActive && 'text-foreground/60 hover:text-foreground')}
        >
            {text}
        </Link>
    )
}
