'use client'
import usePortfoliosQuery from '@/lib/query/portfolios/usePortfoliosQuery'
import GetStartedDialog from '../components/get-started-dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import portfolioIdRoute from '../portfolio/[id]/_route'
import ApplicationLabel from '@/components/labels/application-label'
import PortfolioCard from './components/portfolio-card'

export default function Page() {
    const { data: portfolios = [] } = usePortfoliosQuery()

    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-xl font-bold">Portfolios</h1>
                <div className="flex flex-wrap gap-10">
                    {portfolios.map((portfolio, index) => (
                        <PortfolioCard key={index} portfolio={portfolio} />
                    ))}
                </div>
            </div>
            <GetStartedDialog />
        </>
    )
}
