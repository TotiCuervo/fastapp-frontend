import Button from '@/components/buttons/button'
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
type NavLabel = 'All Items' | 'Education' | 'Experience' | 'Skills'

export interface FilterButtonItem {
    Icon: LucideIcon | React.FC
    label: NavLabel
}

interface IProps extends FilterButtonItem {
    active: boolean
}

export default function FilterButton({ Icon, label, active }: IProps) {
    return (
        <div
            className={twMerge(
                'inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                active ? 'bg-foreground text-background' : 'hover:bg-foreground/10'
            )}
        >
            <Icon className="mr-2 h-5 w-5" />
            {label}
        </div>
    )
}
