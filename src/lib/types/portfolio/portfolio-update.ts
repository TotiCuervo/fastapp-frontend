import Update from '../update'
import Portfolio from './portfolio'

type PortfolioUpdate = Update<Portfolio> & {
    id: Portfolio['id']
    name: string
}

export default PortfolioUpdate
