'use client'
import NavbarContainer from '@/components/navbar/navbar-container'
import NavbarGroup from '@/components/navbar/navbar-group'
import LogoImage from '@/components/misc/logo-image'
import { ThemeToggle } from '@/components/misc/theme-toggle'
import Link from 'next/link'
import Button from '@/components/buttons/button'
import { loginRoute } from '@/lib/routes/loginRoute'
import { signupRoute } from '@/lib/routes/signupRoute'
import { useUserContext } from '@/context/UserContext'
import UserDropdown from '../../components/dropdown/user-dropdown'
import { Skeleton } from '@/components/ui/skeleton'
import NavbarItem from '@/components/navbar/navbar-item'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'

export default function Navbar() {
    const { user, loading } = useUserContext()

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
                </NavbarGroup>
                <NavbarGroup gap={4}>
                    <ThemeToggle />
                    {loading ? (
                        <Skeleton className="h-[40px] w-[100px] rounded-xl" />
                    ) : !user ? (
                        <>
                            <Link href={loginRoute()}>
                                <Button variant="ghost">Login</Button>
                            </Link>
                            <Link href={signupRoute()}>
                                <Button>Signup</Button>
                            </Link>
                        </>
                    ) : (
                        <UserDropdown />
                    )}
                </NavbarGroup>
            </NavbarGroup>
        </NavbarContainer>
    )
}
