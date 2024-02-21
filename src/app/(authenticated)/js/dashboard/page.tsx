'use client'
import usePortfoliosQuery from '@/lib/query/portfolios/usePortfoliosQuery'
import GetStartedDialog from '../components/get-started-dialog'
import PortfolioCard from './components/portfolio-card'
import PortfolioFormModal from '@/components/modals/portfolio-form-modal'
import Button from '@/components/buttons/button'
import usePortfoliosQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfoliosQueryInvalidation'
import { useRouter } from 'next/navigation'
import portfolioIdRoute from '../portfolio/[id]/_route'

export default function Page() {
    const { data: portfolios = [] } = usePortfoliosQuery()
    const invalidation = usePortfoliosQueryInvalidation()
    const router = useRouter()
    return (
        <>
            <div className="mx-auto flex w-full flex-col">
                <div className="flex w-full items-center justify-between">
                    <h1 className="text-3xl font-bold">Portfolios</h1>
                    <PortfolioFormModal
                        trigger={<Button size="sm">New Portfolio</Button>}
                        onSuccessfullSubmit={(portfolio) => {
                            invalidation()
                            router.push(portfolioIdRoute({ id: portfolio.id }))
                        }}
                    />
                </div>
                <div className="flex flex-wrap gap-4 pt-10">
                    {portfolios.map((portfolio, index) => (
                        <PortfolioCard
                            key={index}
                            portfolio={portfolio}
                        />
                    ))}
                </div>
            </div>
            <GetStartedDialog />
        </>
    )
}
