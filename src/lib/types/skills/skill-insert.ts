import Insert from '../insert'
import { User } from '../user'
import Skill from './skill'

interface SkillInsert {
    userId: User['id']
    skillSets: string[]
}

export default SkillInsert
