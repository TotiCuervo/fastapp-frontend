import TypeRoute from '@/lib/types/shared/type-route'
import route from '../_route'

interface PortfolioIdRoute {
    id: string | number
    type?: TypeRoute
}

const portfolioIdRoute = ({ id, type }: PortfolioIdRoute) => `${route()}/${id}${type ? `/?type=${type}` : ''}`

export default portfolioIdRoute
