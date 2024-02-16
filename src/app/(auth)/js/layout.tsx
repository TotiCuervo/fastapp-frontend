import SidebarContainer from '@/components/sidebar/sidebar-container'
import SidebarGroup from '@/components/sidebar/sidebar-group'
import SidebarItem from '@/components/sidebar/siderbar-item'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import React from 'react'
import Sidebar from './components/sidebar'
import Navbar from './components/navbar'

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-1 flex-col">
            <Navbar />
            <div className="flex flex-1 p-10">{children}</div>
        </div>
    )
}
