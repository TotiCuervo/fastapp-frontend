'use client'
import { AlignLeft } from 'lucide-react'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import EducationIcon from '@/components/icons/education-icon'
import ExperienceIcon from '@/components/icons/experience-icon'
import capitalize from '@/lib/method/capitalize'
import FilterItems, { FilterItem } from './filter-items'
import TypeRoute from '@/lib/types/shared/type-route'
import SkillIcon from '@/components/icons/skill-icon'

interface IProps {
    route: (params?: { type?: TypeRoute }) => string
}

export default function PortfolioFilterItems({ route }: IProps) {
    const items: FilterItem[] = [
        { Icon: AlignLeft, label: 'All Items', route: route() },
        { Icon: EducationIcon, label: 'Education', route: route({ type: 'education' }) },
        { Icon: ExperienceIcon, label: 'Experience', route: route({ type: 'experience' }) },
        { Icon: SkillIcon, label: 'Skills', route: route({ type: 'skills' }) }
    ]

    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')

    // Capitalize and check if type is one of the labels
    const capitalizedType = typeParam ? capitalize(typeParam) : null
    const currentLabel = items.find((item) => item.label === capitalizedType)?.label || 'All Items'
    return <FilterItems items={items} active={(item) => item.label === currentLabel} />
}
