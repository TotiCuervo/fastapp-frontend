'use client'
import React, { createContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { User } from '@/lib/types/user'

// Define the shape of the context value
interface UserContextValue {
    user: User | null
    setUser: (user: User | null) => void
}

// Create the initial context value
const initialUserContextValue: UserContextValue = {
    user: null,
    setUser: () => {},
}

// Create the context
export const UserContext = createContext<UserContextValue>(initialUserContextValue)

// Create the context provider function
export function UserProvider({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession()

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (!session || !session.user) {
            setUser(null)
            return
        }
        setUser(session.user)
    }, [session])

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

// Create the useUser hook
export function useUserContext() {
    return React.useContext(UserContext)
}
