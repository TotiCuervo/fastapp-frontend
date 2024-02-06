import Image from 'next/image'
import React from 'react'

interface SidebarContainerProps {
    children: React.ReactNode
}

export default function SidebarContainer({ children }: SidebarContainerProps) {
    return (
        <div className="sticky bottom-0 top-0 flex h-screen w-64 flex-col border-r border-gray-300 p-4 py-6">
            <div>
                <Image
                    src="/logo.png"
                    alt="Fastapp logo"
                    width={50}
                    height={50}
                />
            </div>
            <div className="mt-8 flex flex-col">{children}</div>
        </div>
    )
}
