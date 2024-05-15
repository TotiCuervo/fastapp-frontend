'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import settingsProfileRoute from '../profile/_route'

interface TabProps {
    href: string
    title: string
}

export default function Tabs() {
    const tabs: TabProps[] = [
        {
            href: settingsProfileRoute(),
            title: 'Profile'
        }
    ]
    const pathname = usePathname()

    return (
        <div className="flex w-full gap-8 border-b">
            {tabs.map((tab, index) => (
                <Link
                    key={`${tab.title}-${index}`}
                    href={tab.href}
                    className={twMerge(
                        'trans border-b-2 border-b-2 px-4 py-2 text-lg font-semibold',
                        pathname === tab.href
                            ? 'text-primary-600 border-primary'
                            : 'border-transparent text-muted-foreground hover:text-foreground/90'
                    )}
                >
                    {tab.title}
                </Link>
            ))}
        </div>
    )
}
