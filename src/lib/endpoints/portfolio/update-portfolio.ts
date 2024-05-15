import client from '@/lib/client'
import PortfolioUpdate from '@/lib/types/portfolio/portfolio-update'

export default async function UpdatePortfolio({ id, experiences = [], ...props }: PortfolioUpdate) {
    return client.patch(`/portfolios/${id}`, {
        ...props,
        experiences
    })
}
