import Education from '../education/education'
import Experience from '../experience/experience'

export default interface Portfolio {
    id: number
    name: string
    description: string
    education: Education[]
    skills: []
    experiences: Experience[]
}
