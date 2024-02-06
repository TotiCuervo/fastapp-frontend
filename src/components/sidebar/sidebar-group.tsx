import React from 'react'

interface SidebarGroupProps {
    children: React.ReactNode
    justify?: 'start' | 'end' | 'center' | 'between' | 'around'
}

export default function SidebarGroup({ children }: SidebarGroupProps) {
    return <div className="flex flex-col">{children}</div>
}
