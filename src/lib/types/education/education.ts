import { User } from '../user'
import EducationDate from '../misc/DateProfile'

export default interface Education {
    id: number
    school: string
    degree: string
    startedOn: EducationDate
    endedOn: EducationDate
    fieldOfStudy: string
    gpa?: number
    gpaScale?: number
}
