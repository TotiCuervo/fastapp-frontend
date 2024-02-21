import client from '@/lib/client'
import { User } from '@/lib/types/user'

interface GetUserEducationProps {
    userId: User['id']
}

export default async function getUserEducation({ userId, ...props }: GetUserEducationProps) {
    return client.get(`/users/${userId}/education`)
}
