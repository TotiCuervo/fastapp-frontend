import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import Experience from './experience'

export default interface ExperienceUpdate extends Insert<Omit<Experience, 'company' | 'month'>, 'userId'> {
    id: Experience['id']
    portfolios?: Portfolio['id'][]
    company: string
    startMonth: number
    startYear: number
    endMonth?: number
    endYear?: number
}
