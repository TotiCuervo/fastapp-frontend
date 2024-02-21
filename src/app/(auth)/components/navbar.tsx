'use client'
import NavbarContainer from '@/components/navbar/navbar-container'
import NavbarGroup from '@/components/navbar/navbar-group'
import LogoImage from '@/components/misc/logo-image'
import { ThemeToggle } from '@/components/misc/theme-toggle'
import Link from 'next/link'

export default function Navbar() {
    return (
        <NavbarContainer noBorder>
            <NavbarGroup
                className="w-full"
                justify="between"
            >
                <NavbarGroup gap={10}>
                    <Link href="/">
                        <LogoImage size={50} />
                    </Link>
                </NavbarGroup>
                <ThemeToggle />
            </NavbarGroup>
        </NavbarContainer>
    )
}
