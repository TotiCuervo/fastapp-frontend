'use client'
import { DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { EllipsisDropdownMenu } from '@/components/dropdown/ellipsis-dropdown'
import { Pencil, Trash2 } from 'lucide-react'
import AddExperienceModal from '@/components/modals/add-experience-modal'
import { useState } from 'react'
import Portfolio from '@/lib/types/portfolio/portfolio'
import Experience from '@/lib/types/experience/experience'

interface IProps {
    experience: Experience
    invalidation?: () => void
    portfolioId?: Portfolio['id']
}

export default function ExperienceCardDropdown({ experience, invalidation, portfolioId }: IProps) {
    const [openDropdown, setOpenDropdown] = useState(false)
    const [openExperienceModal, setOpenExperienceModal] = useState(false)

    function handleOpenExperienceModal(e: React.MouseEvent) {
        setOpenExperienceModal(true)
        setOpenDropdown(false)
        e.preventDefault()
        e.stopPropagation()
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
                        <DropdownMenuItem>
                            <Trash2
                                className="mr-2 text-destructive"
                                size={16}
                            />
                            <span className="text-destructive">Delete</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleOpenExperienceModal}>
                            <Pencil
                                className="mr-2"
                                size={16}
                            />
                            <span>Edit</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </EllipsisDropdownMenu>
            <AddExperienceModal
                open={openExperienceModal}
                setOpen={setOpenExperienceModal}
                experience={experience}
                onSuccessfullSubmit={invalidation}
                portfolioId={portfolioId}
            />
        </>
    )
}
