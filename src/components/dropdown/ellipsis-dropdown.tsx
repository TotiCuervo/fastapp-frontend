import { MoreHorizontal } from 'lucide-react'

import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface IProps {
    size?: number
    children: React.ReactNode
}

export function EllipsisDropdownMenu({ children, size = 20 }: IProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex h-8 w-8 items-center justify-center rounded-full transition hover:text-gray-400">
                    <MoreHorizontal size={size} />
                </div>
            </DropdownMenuTrigger>
            {children}
        </DropdownMenu>
    )
}
