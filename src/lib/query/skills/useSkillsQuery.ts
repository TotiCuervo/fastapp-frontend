import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import Skill from '@/lib/types/skills/skill'
import getSkills, { GetSkillsParams } from '@/lib/endpoints/skill/get-skills'

interface SkillsQueryProps {
    params?: GetSkillsParams
    enabled?: boolean
}

export default function useSkillsQuery({ params, enabled }: SkillsQueryProps = {}) {
    return useQuery<Skill[]>({
        queryKey: Keys.skills(),
        queryFn: () => fetch(params),
        enabled: enabled,
    })
}

async function fetch({ ...props }: GetSkillsParams = {}) {
    const { data } = await getSkills({ ...props })
    return data.data
}
