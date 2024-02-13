'use client'
import { UserProvider } from '@/context/UserContext'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

interface ProvidersProps {
    children: ReactNode
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // With SSR, we usually want to set some default staleTime
                        // above 0 to avoid refetching immediately on the client
                        staleTime: 60 * 1000,
                    },
                },
            })
    )

    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    <UserProvider>{children}</UserProvider>
                </QueryClientProvider>
                <Toaster
                    richColors
                    position="top-right"
                    duration={5000}
                    closeButton
                />
            </SessionProvider>
        </NextThemesProvider>
    )
}

export default Providers
