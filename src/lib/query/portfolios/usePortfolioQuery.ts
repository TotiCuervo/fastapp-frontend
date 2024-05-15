import Portfolio from '@/lib/types/portfolio/portfolio'
import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import getPortfolio from '@/lib/endpoints/portfolio/get-portfolio'

interface usePortfolioQueryProps {
    id: Portfolio['id'] | undefined
}

export default function usePortfolioQuery({ id }: usePortfolioQueryProps) {
    return {
        ...useQuery<Portfolio>({
            queryKey: Keys.portfolio(id!!),
            queryFn: () => fetch({ id: id!! }),
            enabled: !!id,
        }),
    }
}

async function fetch({ id }: { id: Portfolio['id'] }) {
    const { data } = await getPortfolio({ id })
    return data.data
}
