'use client'
import { AlignLeft } from 'lucide-react'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import EducationIcon from '@/components/icons/education-icon'
import ExperienceIcon from '@/components/icons/experience-icon'
import capitalize from '@/lib/method/capitalize'
import itemsRoute from '../../items/_route'
import FilterItems, { FilterItem } from './filter-items'
import TypeRoute from '@/lib/types/shared/type-route'

interface IProps {
    route: (params?: { type?: TypeRoute }) => string
}

export default function TypeFilterItems({ route }: IProps) {
    const items: FilterItem[] = [
        { Icon: AlignLeft, label: 'All Items', route: route() },
        { Icon: EducationIcon, label: 'Education', route: route({ type: 'education' }) },
        { Icon: ExperienceIcon, label: 'Experience', route: route({ type: 'experience' }) },
    ]

    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')

    // Capitalize and check if type is one of the labels
    const capitalizedType = typeParam ? capitalize(typeParam) : null
    const currentLabel = items.find((item) => item.label === capitalizedType)?.label || 'All Items'
    return (
        <FilterItems
            items={items}
            active={(item) => item.label === currentLabel}
        />
    )
}
