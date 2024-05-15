'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut } from 'next-auth/react'
import Button from '../buttons/button'
import { ChevronRight, PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import EducationIcon from '../icons/education-icon'
import ExperienceIcon from '../icons/experience-icon'
import EducationFormModal from '../modals/education-form-modal'
import useUserEducationQueryInvalidation from '@/lib/query/education/invalidations/useUserEducationQueryInvalidation'

export default function NewDropdown() {
    const [open, setOpen] = useState(false)
    const [openEducation, setOpenEducation] = useState(false)
    const [openExperience, setOpenExperience] = useState(false)

    const invalidateEducation = useUserEducationQueryInvalidation()

    return (
        <>
            <DropdownMenu
                open={open}
                onOpenChange={setOpen}
            >
                <DropdownMenuTrigger>
                    <Button className="px-2 pl-3">
                        Add new
                        <ChevronRight
                            className={twMerge(
                                'ml-1 h-5 w-5 text-primary-foreground/70 transition',
                                open && 'rotate-90 transform'
                            )}
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setOpenEducation(true)}>
                        <EducationIcon className="mr-2 h-5 w-5" />
                        Education
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem>
                        <ExperienceIcon className="mr-2 h-5 w-5" />
                        Experience
                    </DropdownMenuItem> */}
                </DropdownMenuContent>
            </DropdownMenu>
            <EducationFormModal
                open={openEducation}
                setOpen={setOpenEducation}
                onSuccessfullSubmit={invalidateEducation}
            />
        </>
    )
}
