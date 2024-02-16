import client from '@/lib/client'
import PortfolioDelete from '@/lib/types/portfolio/portfolio-delete'

export default async function deletePortfolio({ id }: PortfolioDelete) {
    return client.delete(`/portfolios/${id}`)
}
