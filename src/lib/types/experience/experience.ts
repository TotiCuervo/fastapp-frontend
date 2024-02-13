import Company from '../company/company'
import DateProfile from '../misc/DateProfile'
import { User } from '../user'
import ExperienceType from './experience-type'

export default interface Experience {
    company: Company
    position: string
    location: string
    startedOn: DateProfile
    endedOn?: DateProfile
    description: string
    isCurrent: boolean
    experienceType: ExperienceType
    userId: User['id']
}
