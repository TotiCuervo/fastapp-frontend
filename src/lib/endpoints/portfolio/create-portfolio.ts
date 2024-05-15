import client from '@/lib/client'
import PortfolioInsert from '@/lib/types/portfolio/portfolio-insert'

export default async function createPortfolio({
    experience = [],
    skills = [],
    education = [],
    ...props
}: PortfolioInsert) {
    return client.post('/portfolios', {
        ...props,
        experience,
        skills,
        education
    })
}
