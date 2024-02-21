import { useQuery } from '@tanstack/react-query'
import { Keys } from './keys'
import { User } from '@/lib/types/user'
import Experience from '@/lib/types/experience/experience'
import getUserExperience from '@/lib/endpoints/experience/get-user-experience'

interface IProps {
    userId?: User['id']
}

export default function useUserExperienceQuery({ userId }: IProps) {
    return useQuery<Experience[]>({
        queryKey: Keys.userExperience,
        queryFn: () => fetch({ userId: userId!! }),
        enabled: !!userId,
    })
}

async function fetch({ userId }: { userId: User['id'] }) {
    const { data } = await getUserExperience({ userId })
    return data.data
}
