import { User } from './user'

interface Delete<T extends { id: any }> {
    id: Required<T>['id']
    userId: User['id']
}

export default Delete
