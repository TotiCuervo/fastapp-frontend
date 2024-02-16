import Insert from '../insert'
import Portfolio from './portfolio'

type PortfolioInsert = Insert<Portfolio> & {
    name: string
}

export default PortfolioInsert
