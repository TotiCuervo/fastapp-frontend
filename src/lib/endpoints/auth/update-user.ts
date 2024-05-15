import client from '@/lib/client'
import { User } from '@/lib/types/user'

interface UpdateParams extends Partial<Omit<User, 'password' | 'phoneNumbers'>> {
    phoneNumber?: string
}

export default async function updateUser({ id, ...props }: UpdateParams) {
    return client.patch(`/users/${id}`, {
        ...props
    })
}
