import SidebarContainer from '@/components/sidebar/sidebar-container'
import SidebarGroup from '@/components/sidebar/sidebar-group'
import SidebarItem from '@/components/sidebar/siderbar-item'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import jsQuestionBankRoute from '@/lib/routes/jsQuestionBankRoute'
import React from 'react'

export default function Sidebar() {
    return (
        <SidebarContainer>
            <SidebarGroup>
                <SidebarItem
                    icon={'Home'}
                    href={jsDashboardRoute()}
                >
                    Dashboard
                </SidebarItem>
                <SidebarItem
                    icon={'List'}
                    href={jsQuestionBankRoute()}
                >
                    Question Bank
                </SidebarItem>
            </SidebarGroup>
        </SidebarContainer>
    )
}
