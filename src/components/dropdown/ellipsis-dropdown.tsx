import { MoreHorizontal } from 'lucide-react'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useEffect, useState } from 'react'

interface IProps {
    size?: number
    children: React.ReactNode
    open?: boolean
    setOpen?: (open: boolean) => void
}

export function EllipsisDropdownMenu({ children, open, setOpen, size = 20 }: IProps) {
    const [internalOpen, setInternalOpen] = useState(false)

    function handleOpenChange(open: boolean) {
        setOpen && setOpen(open)
        setInternalOpen(open)
    }

    useEffect(() => {
        if (open !== undefined) setInternalOpen(open)
    }, [open])

    return (
        <DropdownMenu
            open={internalOpen}
            onOpenChange={handleOpenChange}
        >
            <DropdownMenuTrigger asChild>
                <div className="flex h-8 w-8 items-center justify-center rounded-full transition hover:text-gray-400">
                    <MoreHorizontal size={size} />
                </div>
            </DropdownMenuTrigger>
            {children}
        </DropdownMenu>
    )
}
