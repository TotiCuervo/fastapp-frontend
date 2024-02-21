import React from 'react'
import Link from 'next/link'
import { loginRoute } from '@/lib/routes/loginRoute'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import LoginForm from '../components/login-form'
import { signupRoute } from '@/lib/routes/signupRoute'

export default function Page() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Welcome back</CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
                <CardFooter>
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
                </CardFooter>
            </Card>
            <span className="w-full text-center text-muted-foreground">
                Don't have an account?{' '}
                <Link
                    href={signupRoute()}
                    className="text-default font-semibold transition dark:text-gray-300 dark:hover:text-gray-100"
                >
                    Sign up
                </Link>
            </span>
        </>
    )
}
