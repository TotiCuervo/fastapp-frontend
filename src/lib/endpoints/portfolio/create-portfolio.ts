import client from '@/lib/client'
import PortfolioInsert from '@/lib/types/portfolio/portfolio-insert'

export default async function createPortfolio({
    experiences = [],
    skills = [],
    education = [],
    ...props
}: PortfolioInsert) {
    return client.post('/portfolios', {
        ...props,
        experiences,
        skills,
        education,
    })
}
