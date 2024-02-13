import Education from '../education/education'
import Experience from '../experience/experience'

export default interface Portfolio {
    id: string
    name: string
    description: string
    education: Education[]
    skills: []
    experience: Experience[]
}
