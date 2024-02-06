import client from '@/lib/client'

interface createUserParams {
    firstName: string
    lastName: string
    email: string
    password: string
}

export default async function createUser(params: createUserParams) {
    return client.post('/users/', {
        first_name: params.firstName,
        last_name: params.lastName,
        ...params,
    })
}
