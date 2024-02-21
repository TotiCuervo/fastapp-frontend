'use client'

import TypeRoute from '@/lib/types/shared/type-route'
import { useSearchParams } from 'next/navigation'
import React from 'react'

interface IProps {
    title: string
    children: React.ReactNode | React.ReactNode[]
    addModal: React.ReactNode
    showIf?: TypeRoute
}

export default function Section({ title, children, addModal, showIf }: IProps) {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')

    if (typeParam !== null && typeParam !== showIf) {
        return null
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-baseline justify-between">
                <h2 className="text-xl font-bold">{title}</h2>
                {addModal}
            </div>
            {children}
        </div>
    )
}
