import client from '@/lib/client'
import Portfolio from '@/lib/types/portfolio/portfolio'

interface GetPortfolioProps {
    id: Portfolio['id']
}

export default async function getPortfolio({ id }: GetPortfolioProps) {
    return client.get(`/portfolios/${id}`)
}
