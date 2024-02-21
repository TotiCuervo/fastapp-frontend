import React from 'react'
import Link from 'next/link'
import { loginRoute } from '@/lib/routes/loginRoute'
import SignupForm from '../components/signup-form'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function Page() {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>Enter your email below to create your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignupForm />
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
                Already have an account?{' '}
                <Link
                    href={loginRoute()}
                    className="text-default font-semibold transition dark:text-gray-300 dark:hover:text-gray-100"
                >
                    Log in
                </Link>
            </span>
        </>
    )
}
