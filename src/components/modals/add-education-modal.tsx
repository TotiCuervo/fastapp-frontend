'use client'

import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AddEducationForm from '../forms/add-education-form'
import Button from '../buttons/button'
import { useState } from 'react'
import Portfolio from '@/lib/types/portfolio/portfolio'
import usePortfolioQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfolioQueryInvalidation'

interface AddEducationModalProps {
    trigger?: React.ReactNode
    portfolioId?: Portfolio['id']
}

export default function AddEducationModal({ trigger, portfolioId }: AddEducationModalProps) {
    const [open, setOpen] = useState(false)
    const invalidate = usePortfolioQueryInvalidation()

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
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
                            setOpen(false)
                            portfolioId && invalidate(portfolioId)
                        }}
                        portfolioId={portfolioId}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}