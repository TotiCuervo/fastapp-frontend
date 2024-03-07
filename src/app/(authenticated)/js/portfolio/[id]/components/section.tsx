'use client'

import TypeRoute from '@/lib/types/shared/type-route'
import { ChevronRightIcon } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface IProps {
    title: string
    children: React.ReactNode | React.ReactNode[]
    addModal: React.ReactNode
    showIf?: TypeRoute
    toggleable?: boolean
}

export default function Section({ title, children, addModal, showIf, toggleable }: IProps) {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')

    const [isHidden, setIsHidden] = useState(true)

    if (typeParam !== null && typeParam !== showIf) {
        return null
    }

    function toggle() {
        if (!toggleable) return
        setIsHidden(!isHidden)
    }

    return (
        <div className={'flex flex-col gap-4'}>
            <div
                className={twMerge('flex items-baseline justify-between', toggleable && 'cursor-pointer')}
                onClick={toggle}
            >
                <div className="flex items-center">
                    <h2 className="text-xl font-bold">{title}</h2>
                    {toggleable && (
                        <ChevronRightIcon
                            className={twMerge('ml-1 h-5 w-5 transition', !isHidden && 'rotate-90 transform')}
                        />
                    )}
                </div>
                {addModal}
            </div>
            {(toggleable && !isHidden && children) || (!toggleable && children)}
        </div>
    )
}
