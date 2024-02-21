import React from 'react'
import Navbar from './components/navbar'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

interface IProps {
    children: React.ReactNode
}

export default async function layout({ children }: IProps) {
    const session = await getServerSession(authOptions)
    if (session) {
        redirect(jsDashboardRoute())
    }
    return (
        <div className="flex h-screen flex-col">
            <Navbar />
            <div className="container flex grid grow flex-col items-center justify-center lg:max-w-none lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">{children}</div>
            </div>
        </div>
    )
}
