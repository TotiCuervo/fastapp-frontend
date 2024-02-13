import Insert from '../insert'
import Portfolio from '../portfolio/portfolio'
import Education from './education'

interface EducationInsert extends Insert<Education, 'userId'> {
    portfolios?: Portfolio['id'][]
    startMonth: number
    startYear: number
    endMonth: number
    endYear: number
}

export default EducationInsert
