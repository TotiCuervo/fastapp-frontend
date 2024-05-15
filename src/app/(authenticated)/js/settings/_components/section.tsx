import HasChildren from '@/types/misc/HasChildren'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps extends HasChildren {
    title: string
    description?: string
    last?: boolean
}

export default function Section({ children, title, description, last }: IProps) {
    return (
        <div className={twMerge('flex flex-col py-6 md:flex-row', last ? '' : 'border-b')}>
            <div className="w-full md:w-1/2">
                <h2 className="text-md font-medium">{title}</h2>
                <p className="text-sm text-foreground/70">{description}</p>
            </div>
            <div className="w-full pt-4 md:w-1/2 md:pt-0">{children}</div>
        </div>
    )
}
