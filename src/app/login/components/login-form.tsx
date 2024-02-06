'use client'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import Button from '@/components/buttons/button'
import { Alert } from '@/lib/types/alert'
import Alerter from '@/components/alerts/alerter'
import { useRouter } from 'next/navigation'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState<Alert>()
    const router = useRouter()
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await signIn('credentials', {
                email,
                password,
                redirect: false,
            })

            if (!response || !response.ok) {
                throw new Error('Invalid credentials')
            }

            setAlert(undefined)

            router.push(jsDashboardRoute())
        } catch (error) {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
                <Alerter alert={alert} />
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Password</Label>
                    <Input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button
                    loading={loading}
                    loadingText="Logging in..."
                >
                    Login
                </Button>
            </div>
        </form>
    )
}
