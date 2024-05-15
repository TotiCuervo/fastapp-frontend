import client from '@/lib/client'
import EducationDelete from '@/lib/types/education/education-delete'

export default async function deleteUserEducation({ userId, id }: EducationDelete) {
    return client.delete(`/users/${userId}/education/${id}`)
}
