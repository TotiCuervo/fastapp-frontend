import { userType } from './userType'
import PhoneNumber from './misc/phone-number'
export interface User {
    email: string
    password: string
    firstName: string
    lastName: string
    userType: userType
    minSalary: number
    dob?: string
    id: number
    phoneNumbers: PhoneNumber[]
}
