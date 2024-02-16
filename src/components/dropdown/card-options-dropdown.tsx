'use client'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EllipsisDropdownMenu } from '@/components/dropdown/ellipsis-dropdown'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface IProps {
    handleEditClick: () => void
    handleDeleteClick: () => void
}

export default function CardOptionsDropdown({ handleEditClick, handleDeleteClick }: IProps) {
    const [openDropdown, setOpenDropdown] = useState(false)

    function preventDefault(e: React.MouseEvent, func: () => void) {
        e.preventDefault()
        e.stopPropagation()
        setOpenDropdown(false)
        func()
    }

    return (
        <>
            <EllipsisDropdownMenu
                open={openDropdown}
                setOpen={setOpenDropdown}
            >
                <DropdownMenuContent
                    className="w-56"
                    align="end"
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem onClick={(e) => preventDefault(e, handleEditClick)}>
                            <Pencil
                                className="mr-2"
                                size={16}
                            />
                            <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => preventDefault(e, handleDeleteClick)}>
                            <Trash2
                                className="mr-2 text-destructive"
                                size={16}
                            />
                            <span className="text-destructive">Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </EllipsisDropdownMenu>
        </>
    )
}
