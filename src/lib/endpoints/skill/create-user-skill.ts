import client from '@/lib/client'
import SkillInsert from '@/lib/types/skills/skill-insert'

export default async function createUserSkill({ userId, ...props }: SkillInsert) {
    return client.post(`/users/${userId}/skills`, {
        ...props
    })
}
