import client from '@/lib/client'
import EducationUpdate from '@/lib/types/education/education-update'

export default async function updateUserEducation({ userId, id, ...props }: EducationUpdate) {
    return client.patch(`/users/${userId}/education/${id}`, {
        ...props,
    })
}
