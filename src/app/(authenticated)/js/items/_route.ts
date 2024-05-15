import TypeRoute from '@/lib/types/shared/type-route'
import jsRoute from '../_route'

const itemsRoute = ({ type }: { type?: TypeRoute } = {}) => {
    return `${jsRoute()}/items${type ? `?type=${type}` : ''}`
}

export default itemsRoute
