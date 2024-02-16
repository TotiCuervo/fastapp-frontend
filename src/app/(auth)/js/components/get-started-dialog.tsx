'use client'

import usePortfoliosQuery from '@/lib/query/portfolios/usePortfoliosQuery'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import PortfolioForm from '@/components/forms/portfolio-form'
import { useRouter } from 'next/navigation'
import portfolioIdRoute from '../portfolio/[id]/_route'
import Portfolio from '@/lib/types/portfolio/portfolio'

export default function GetStartedDialog() {
    const router = useRouter()

    const { data: portfolios = [], isLoading, invalidate } = usePortfoliosQuery()

    function onSubmit(portfolio: Portfolio) {
        invalidate()
        router.push(portfolioIdRoute(portfolio.id))
    }

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
                        <PortfolioForm onSuccessfullSubmit={onSubmit} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
