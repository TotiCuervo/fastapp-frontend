import client from '@/lib/client'

export default async function getPortfolios() {
    return client.get('/portfolios')
}
