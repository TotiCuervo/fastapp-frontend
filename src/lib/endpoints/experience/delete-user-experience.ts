import client from '@/lib/client'
import ExperienceDelete from '@/lib/types/experience/experience-delete'

export default async function deleteUserExperience({ userId, id }: ExperienceDelete) {
    return client.delete(`/users/${userId}/experience/${id}`)
}
