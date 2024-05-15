'use client'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Button from '../buttons/button'
import Portfolio from '@/lib/types/portfolio/portfolio'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import useInternalOpen from '@/lib/hooks/use-internal-open'
import PortfolioForm from '../forms/portfolio-form'

interface ModalProps extends InternalOpenProps {
    portfolio?: Portfolio
    onSuccessfullSubmit?: (portfolio: Portfolio) => void
}

export default function PortfolioFormModal({ trigger, open, setOpen, onSuccessfullSubmit, portfolio }: ModalProps) {
    const { internalOpen, handleSetOpen } = useInternalOpen({ open, setOpen })

    return (
        <Dialog
            open={internalOpen}
            onOpenChange={handleSetOpen}
        >
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{portfolio ? 'Edit' : 'Add'} Portfolio</DialogTitle>
                </DialogHeader>
                <div className="pt-4">
                    <PortfolioForm
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
                        onSuccessfullSubmit={(portfolio) => {
                            handleSetOpen(false)
                            onSuccessfullSubmit && onSuccessfullSubmit(portfolio)
                        }}
                        portfolio={portfolio}
                        saveButtonText="Save"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
