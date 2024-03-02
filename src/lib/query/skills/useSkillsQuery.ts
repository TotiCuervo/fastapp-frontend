import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import Skill from '@/lib/types/skills/skill'
import getSkills from '@/lib/endpoints/skill/get-skills'

export default function useSkillsQuery() {
    return useQuery<Skill[]>({
        queryKey: Keys.skills(),
        queryFn: () => fetch()
    })
}

async function fetch() {
    const { data } = await getSkills()
    return data.data
}
