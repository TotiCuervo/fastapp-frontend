import React from 'react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { loginRoute } from '@/lib/routes/loginRoute'
import { signupRoute } from '@/lib/routes/signupRoute'

const logoPath = '/logo.png'

export default function LandingNavBar() {
    return (
        <header className="flex justify-between px-4 py-3">
            <div className="flex items-center">
                <Image
                    src={logoPath}
                    alt="Logo"
                    width={50}
                    height={50}
                />
                <h1 className="scroll-m-20 pl-4 text-lg font-extrabold tracking-tight">Fast App</h1>
            </div>
            <div className="flex gap-4">
                <Link href={loginRoute()}>
                    <Button variant="ghost">Login</Button>
                </Link>
                <Link href={signupRoute()}>
                    <Button>Signup</Button>
                </Link>
            </div>
        </header>
    )
}
