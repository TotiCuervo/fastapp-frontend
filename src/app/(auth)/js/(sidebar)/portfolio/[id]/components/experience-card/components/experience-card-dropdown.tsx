'use client'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EllipsisDropdownMenu } from '@/components/dropdown/ellipsis-dropdown'
import { Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

interface IProps {
    setOpenExperienceModal: (open: boolean) => void
}

export default function ExperienceCardDropdown({ setOpenExperienceModal }: IProps) {
    const [openDropdown, setOpenDropdown] = useState(false)

    function handleOpenExperienceModal(e: React.MouseEvent) {
        e.preventDefault()
        e.stopPropagation()
        setOpenDropdown(false)
        setOpenExperienceModal(true)
    }

    return (
        <>
            <EllipsisDropdownMenu open={openDropdown} setOpen={setOpenDropdown}>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Trash2 className="mr-2 text-destructive" size={16} />
                            <span className="text-destructive">Delete</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleOpenExperienceModal}>
                            <Pencil className="mr-2" size={16} />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </EllipsisDropdownMenu>
        </>
    )
}
