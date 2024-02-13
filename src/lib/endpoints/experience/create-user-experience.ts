import client from '@/lib/client'
import ExperienceInsert from '@/lib/types/experience/experience-insert'

export default async function createUserExperience({ userId, ...props }: ExperienceInsert) {
    return client.post(`/users/${userId}/experience`, {
        ...props,
    })
}
