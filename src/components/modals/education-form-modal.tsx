'use client'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AddEducationForm from '../forms/add-education-form'
import Button from '../buttons/button'
import Portfolio from '@/lib/types/portfolio/portfolio'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import useInternalOpen from '@/lib/hooks/use-internal-open'
import Education from '@/lib/types/education/education'

interface AddEducationModalProps extends InternalOpenProps {
    portfolioId?: Portfolio['id']
    onSuccessfullSubmit?: () => void
    education?: Education
}

export default function EducationFormModal({
    trigger,
    portfolioId,
    open,
    setOpen,
    onSuccessfullSubmit,
    education,
}: AddEducationModalProps) {
    const { internalOpen, handleSetOpen } = useInternalOpen({ open, setOpen })

    return (
        <Dialog
            open={internalOpen}
            onOpenChange={handleSetOpen}
        >
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{education ? 'Edit' : 'Add'} Education</DialogTitle>
                </DialogHeader>
                <div className="pt-4">
                    <AddEducationForm
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
                        education={education}
                        portfolioId={portfolioId}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
