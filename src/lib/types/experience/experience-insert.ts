import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import Experience from './experience'

interface ExperienceInsert extends Insert<Omit<Experience, 'company' | 'month'>, 'userId'> {
    portfolios?: Portfolio['id'][]
    company: string
    startMonth: number
    startYear: number
    endMonth?: number
    endYear?: number
}

export default ExperienceInsert
