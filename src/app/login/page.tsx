import Image from 'next/image'
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupRoute } from '@/lib/routes/signupRoute'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LoginForm from './components/login-form'

export default function Page() {
    return (
        <div className="container grid h-screen flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                className="absolute right-4 top-4 inline-flex h-9"
                href={signupRoute()}
            >
                <Button variant="ghost">Sign up</Button>
            </Link>
            <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
                <div className="absolute inset-0 bg-zinc-900"></div>
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <Image
                        src="/logo.png"
                        alt="Logo"
                        width={50}
                        height={50}
                        className="pr-2"
                    />
                    Fast App
                </div>
            </div>
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
                        <p className="text-sm text-muted-foreground">Welcome back</p>
                    </div>
                    <div className="grid gap-6">
                        <LoginForm />
                    </div>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{' '}
                        <a
                            className="underline underline-offset-4 hover:text-primary"
                            href="/terms"
                        >
                            Terms of Service
                        </a>{' '}
                        and{' '}
                        <a
                            className="underline underline-offset-4 hover:text-primary"
                            href="/privacy"
                        >
                            Privacy Policy
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    )
}
