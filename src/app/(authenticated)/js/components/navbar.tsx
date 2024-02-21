'use client'
import NavbarContainer from '@/components/navbar/navbar-container'
import NavbarGroup from '@/components/navbar/navbar-group'
import NavbarItem from '@/components/navbar/navbar-item'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import UserDropdown from '../../../../components/dropdown/user-dropdown'
import LogoImage from '@/components/misc/logo-image'
import { ThemeToggle } from '@/components/misc/theme-toggle'
import Link from 'next/link'
import itemsRoute from '../items/_route'

export default function Navbar() {
    return (
        <NavbarContainer>
            <NavbarGroup
                className="w-full"
                justify="between"
            >
                <NavbarGroup gap={10}>
                    <Link href="/">
                        <LogoImage size={50} />
                    </Link>
                    <NavbarItem
                        href={jsDashboardRoute()}
                        text="Dashboard"
                    />
                    <NavbarItem
                        href={itemsRoute()}
                        text="Items"
                    />
                </NavbarGroup>
                <div className="flex gap-4">
                    <ThemeToggle />

                    <UserDropdown />
                </div>
            </NavbarGroup>
        </NavbarContainer>
    )
}
