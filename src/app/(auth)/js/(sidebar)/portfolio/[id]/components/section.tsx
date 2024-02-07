'use client'

import Button from '@/components/buttons/button'
import React from 'react'

interface IProps {
    title: string
    children: React.ReactNode | React.ReactNode[]
}

export default function Section({ title, children }: IProps) {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                <Button variant="ghost">Edit</Button>
            </div>
            {children}
        </div>
    )
}
