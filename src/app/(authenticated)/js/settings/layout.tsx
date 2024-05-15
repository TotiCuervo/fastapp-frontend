import HasChildren from '@/lib/types/misc/HasChildren'
import { Metadata } from 'next'
import React from 'react'
import Tabs from './_components/tabs'

export const metadata: Metadata = {
    title: 'Wavy Settings',
    description: 'Settings on Wavy'
}

export default function Layout({ children }: HasChildren) {
    return (
        <div className="mx-auto w-full max-w-screen-lg px-4">
            <div className="py-6">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-foreground/70">Manage your account settings</p>
            </div>
            <Tabs />
            <div className="pt-4">{children}</div>
        </div>
    )
}
