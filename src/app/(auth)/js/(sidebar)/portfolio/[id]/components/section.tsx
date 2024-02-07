'use client'

import React from 'react'

interface IProps {
    title: string
    children: React.ReactNode | React.ReactNode[]
    addModal: React.ReactNode
}

export default function Section({ title, children, addModal }: IProps) {
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
