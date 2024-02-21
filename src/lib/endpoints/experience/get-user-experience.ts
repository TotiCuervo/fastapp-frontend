import client from '@/lib/client'
import Experience from '@/lib/types/experience/experience'
import LaravelResponse from '@/lib/types/misc/laravel-response'
import { User } from '@/lib/types/user'

interface GetUserExperienceProps {
    userId: User['id']
}

export default async function getUserExperience({ userId, ...props }: GetUserExperienceProps) {
    return client.get<LaravelResponse<Experience[]>>(`/users/${userId}/experience`)
}
