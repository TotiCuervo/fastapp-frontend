'use client'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Button from '../buttons/button'
import { useEffect, useState } from 'react'
import AddExperienceForm from '../forms/add-experience-form'
import Experience from '@/lib/types/experience/experience'
import Portfolio from '@/lib/types/portfolio/portfolio'

interface AddEducationModalProps {
    trigger?: React.ReactNode
    triggerClassName?: string
    open?: boolean
    setOpen?: (open: boolean) => void
    experience?: Experience
    onSuccessfullSubmit?: () => void
    portfolioId?: Portfolio['id']
}

export default function AddExperienceModal({
    trigger,
    triggerClassName,
    onSuccessfullSubmit,
    experience,
    open,
    setOpen,
    portfolioId,
}: AddEducationModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)

    useEffect(() => {
        if (open !== undefined) setInternalOpen(open)
    }, [open])

    function handleSetOpen(open: boolean) {
        setOpen && setOpen(open)
        setInternalOpen(open)
    }

    return (
        <Dialog
            open={internalOpen}
            onOpenChange={handleSetOpen}
        >
            {trigger && <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{experience ? 'Edit' : 'Add'} Experience</DialogTitle>
                </DialogHeader>
                <div className="pt-4">
                    <AddExperienceForm
                        Cancel={
                            <DialogClose>
                                <Button
                                    type="reset"
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                        }
                        onSuccessfullSubmit={() => {
                            handleSetOpen(false)
                            onSuccessfullSubmit && onSuccessfullSubmit()
                        }}
                        experience={experience}
                        portfolioId={portfolioId}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
