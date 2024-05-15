import Education from '../education/education'
import Experience from '../experience/experience'
import Skill from '../skills/skill'
import Update from '../update'
import Portfolio from './portfolio'

type PortfolioUpdate = Update<Omit<Portfolio, 'skills' | 'education' | 'experience'>> & {
    id: Portfolio['id']
    name?: string
    skills?: Skill['id'][]
    education?: Education['id'][]
    experience?: Experience['id'][]
}

export default PortfolioUpdate
