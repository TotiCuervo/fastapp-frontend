import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { NextAuthOptions } from 'next-auth'
import axios from 'axios'

const buildUrl = (url: string) => `${process.env.NEXT_PUBLIC_API_URL}/api${url}`

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'jsmith' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const response = await axios.post(buildUrl('/login/'), credentials)

                const { user, token } = response.data

                if (user) {
                    return {
                        ...user,
                        token: token,
                    }
                } else {
                    return null
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {
            if (trigger === 'update') {
                return { ...token, ...session.user }
            }
            return { ...token, ...user }
        },
        async session({ session, token }) {
            session.user = token as any
            return session
        },
    },
    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/',
        verifyRequest: '/',
        newUser: '/dashboard',
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
