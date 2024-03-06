'use client'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Button from '../buttons/button'
import Portfolio from '@/lib/types/portfolio/portfolio'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import useInternalOpen from '@/lib/hooks/use-internal-open'
import Skill from '@/lib/types/skills/skill'
import SkillForm from '../forms/skill-form'

interface ModalProps extends InternalOpenProps {
    portfolioId?: Portfolio['id']
    onSuccessfullSubmit?: () => void
    skills?: Skill[]
}

export default function SkillFormModal({
    trigger,
    portfolioId,
    open,
    setOpen,
    onSuccessfullSubmit,
    skills,
}: ModalProps) {
    const { internalOpen, handleSetOpen } = useInternalOpen({ open, setOpen })

    return (
        <Dialog
            open={internalOpen}
            onOpenChange={handleSetOpen}
        >
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-xl">
                <DialogHeader>
                    <DialogTitle>{'Add'} Skill</DialogTitle>
                </DialogHeader>
                <div className="pt-4">
                    <SkillForm
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
                        portfolioId={portfolioId}
                        skills={skills}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
