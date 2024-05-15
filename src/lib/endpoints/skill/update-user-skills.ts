import client from '@/lib/client'
import SkillInsert from '@/lib/types/skills/skill-insert'

export default async function updateUserSkill({ userId, ...props }: SkillInsert) {
    return client.patch(`/users/${userId}/skills`, {
        ...props,
    })
}
