'use client'
import PageHeader from '@/components/typography/page-header'
import { AlignLeft } from 'lucide-react'
import React from 'react'
import itemsRoute from './_route'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import EducationIcon from '@/components/icons/education-icon'
import ExperienceIcon from '@/components/icons/experience-icon'
import capitalize from '@/lib/method/capitalize'
import FilterButton, { FilterButtonItem } from '@/components/buttons/filter-button'
import TypeFilterItems from '../components/shared/type-filter-items'

interface FilterItems extends FilterButtonItem {
    route: string
}

interface IProps {
    children: React.ReactNode
}

export default function layout({ children }: IProps) {
    const searchParams = useSearchParams()
    const typeParam = searchParams.get('type')

    const titleOptions = ['All Items', 'Education', 'Experience']

    // Capitalize and check if type is one of the labels
    const capitalizedType = typeParam ? capitalize(typeParam) : null
    const currentLabel = capitalizedType
        ? titleOptions.includes(capitalizedType)
            ? capitalizedType
            : 'All Items'
        : 'All Items'
    return (
        <div className="flex w-full flex-col">
            <PageHeader>{currentLabel}</PageHeader>
            <div className="flex flex-col gap-4 pt-10 md:flex-row md:gap-8">
                <div className="flex w-full justify-center sm:justify-start md:w-4/12 lg:w-2/12">
                    <TypeFilterItems route={itemsRoute} />
                </div>
                <div className="w-full md:w-8/12 lg:w-10/12">{children}</div>
            </div>
        </div>
    )
}
