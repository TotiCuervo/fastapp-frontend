import React from 'react'
import CloseIcon from '../icons/close-icon'
import CopiableCard from '../copy/copiable-card'

interface SkillProp {
    children: string
    closeIcon?: boolean
    onClick?: () => void
}

export default function SkillPill({ children, closeIcon, onClick }: SkillProp) {
    if (closeIcon && onClick) {
        return (
            <div
                className="group flex cursor-pointer items-center rounded-xl border bg-card px-3 py-1.5 shadow-sm transition"
                onClick={onClick}
            >
                {children}
                {closeIcon && <CloseIcon className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-foreground" />}
            </div>
        )
    }

    return (
        <CopiableCard
            className="group flex cursor-pointer items-center rounded-xl border bg-card px-3 py-1.5 shadow-sm transition"
            copyText={children}
        >
            {children}
            {closeIcon && <CloseIcon className="ml-2 h-4 w-4 text-muted-foreground group-hover:text-foreground" />}
        </CopiableCard>
    )
}
