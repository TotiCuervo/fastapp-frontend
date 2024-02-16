import Company from '../company/company'
import DateProfile from '../misc/DateProfile'
import ExperienceType from './experience-type'

export default interface Experience {
    id: number
    company: Company
    position: string
    location: string
    startedOn: DateProfile
    endedOn: Partial<DateProfile>
    description: string
    isCurrent: boolean
    experienceType: ExperienceType
}
