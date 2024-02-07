'use client'

import usePortfoliosQuery from '@/lib/query/portfolios/usePortfoliosQuery'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PortfolioForm from '@/components/forms/portfolio-form'

export default function GetStartedDialog() {
    const { data: portfolios = [], isLoading, invalidate } = usePortfoliosQuery()

    return (
        <Dialog open={!isLoading && portfolios.length === 0}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create your first Portfolio!</DialogTitle>
                    <DialogDescription>
                        Portfolios are a way to organize all of your relevant job information. Most people will only
                        need one. But if you have multiple job searches, you can create a portfolio for each one.
                    </DialogDescription>
                    <div className="pt-4">
                        <PortfolioForm onSuccessfullSubmit={invalidate} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
