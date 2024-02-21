import CustomText from '@/lib/types/misc/custom-text'
import React from 'react'

export default function PageHeader({ children, className }: CustomText) {
    return <h1 className={`text-3xl font-bold ${className}`}>{children}</h1>
}
