import client from '../../client'

export default function getCurrentUser() {
    return client.get('/users/me/')
}
