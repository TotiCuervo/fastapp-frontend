import settingsRoute from '../_route'
import route from '../../_route'
const settingsProfileRoute = () => {
    return `${route()}${settingsRoute()}/profile`
}

export default settingsProfileRoute
