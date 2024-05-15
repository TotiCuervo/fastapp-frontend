import client from '@/lib/client'
import EducationInsert from '@/lib/types/education/education-insert'

export default async function createUserEducation({ userId, ...props }: EducationInsert) {
    return client.post(`/users/${userId}/education`, {
        ...props,
    })
}
