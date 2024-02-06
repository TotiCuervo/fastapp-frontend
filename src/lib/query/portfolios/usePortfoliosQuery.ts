import { Portfolio } from '@/lib/types/portfolio/portfolio'
import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import getPortfolios from '@/lib/endpoints/portfolio/get-portfolios'

export default function usePortfoliosQuery() {
    return useQuery<Portfolio[]>({
        queryKey: Keys.portfolios,
        queryFn: () => fetch(),
    })
}

async function fetch() {
    const { data } = await getPortfolios()
    return data.data
}
