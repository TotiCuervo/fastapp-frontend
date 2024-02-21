import Button from '@/components/buttons/button'
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
type NavLabel = 'All Items' | 'Education' | 'Experience'

export interface FilterButtonItem {
    Icon: LucideIcon | React.FC
    label: NavLabel
}

interface IProps extends FilterButtonItem {
    active: boolean
}

export default function FilterButton({ Icon, label, active }: IProps) {
    return (
        <Button
            variant="ghost"
            className={twMerge('w-full justify-start', active && 'bg-accent text-accent-foreground')}
        >
            <Icon className="mr-2 h-5 w-5" />
            {label}
        </Button>
    )
}
