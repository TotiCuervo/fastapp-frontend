'use client'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Button from '../buttons/button'
import ExperienceForm from '../forms/experience-form'
import Experience from '@/lib/types/experience/experience'
import Portfolio from '@/lib/types/portfolio/portfolio'
import useInternalOpen from '@/lib/hooks/use-internal-open'

interface EducationModalProps {
    trigger?: React.ReactNode
    triggerClassName?: string
    open?: boolean
    setOpen?: (open: boolean) => void
    experience?: Experience
    onSuccessfullSubmit?: () => void
    portfolioId?: Portfolio['id']
}

export default function ExperienceFormModal({
    trigger,
    triggerClassName,
    onSuccessfullSubmit,
    experience,
    open,
    setOpen,
    portfolioId,
}: EducationModalProps) {
    const { internalOpen, handleSetOpen } = useInternalOpen({ open, setOpen })

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
                    <ExperienceForm
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
