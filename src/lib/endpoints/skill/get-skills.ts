import client from '@/lib/client'
import Skill from '@/lib/types/skills/skill'
import { AxiosPromise } from 'axios'

export default function getSkills() {
    return client.get(`/skills`)
}
