'use client'
import NewDropdown from '@/components/dropdown/new-dropdown'
import SearchBar from '@/components/misc/search-bar'
import { useUserContext } from '@/context/UserContext'
import useUserEducationQuery from '@/lib/query/education/useUserEducationQuery'
import { useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import EducationCard from '../portfolio/[id]/components/education-card'
import Education from '@/lib/types/education/education'
import Experience from '@/lib/types/experience/experience'
import ExperienceCard from '../portfolio/[id]/components/experience-card'
import useUserExperienceQuery from '@/lib/query/experience/useUserExperienceQuery'
import useUserEducationQueryInvalidation from '@/lib/query/education/invalidations/useUserEducationQueryInvalidation'
import useUserExperienceQueryInvalidation from '@/lib/query/experience/invalidations/useUserExperienceQueryInvalidation'

interface TotalData {
    type: 'education' | 'experience'
    object: Education | Experience
}

function DataRender({ item }: { item: TotalData }) {
    const invalidateEducation = useUserEducationQueryInvalidation()
    const invalidateExperience = useUserExperienceQueryInvalidation()

    if (item.type === 'education') {
        return <EducationCard education={item.object as Education} invalidation={invalidateEducation} />
    } else {
        return <ExperienceCard experience={item.object as Experience} invalidation={invalidateExperience} />
    }
}

export default function page() {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')

    const [search, setSearch] = useState('')

    const { user } = useUserContext()
    const { data: userEducation = [] } = useUserEducationQuery({ userId: user?.id })
    const { data: userExperience = [] } = useUserExperienceQuery({ userId: user?.id })

    const setType = (item: TotalData['object']) => {
        //@ts-ignore
        if (userEducation.includes(item)) {
            return 'education'
        }
        return 'experience'
    }

    const totalData: TotalData[] = [...userEducation, ...userExperience]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((item) => ({ type: setType(item), object: item }))

    const filteredData = filter()

    function filter(): TotalData[] {
        const value = search.toLowerCase()

        const isMatch = (obj: any): boolean => {
            return Object.values(obj).some((val) => {
                if (typeof val === 'object' && val !== null) {
                    // Check if the value is an instance of a specific class if needed
                    // This is helpful for distinguishing between different types of nested objects
                    return isMatch(val)
                } else {
                    return String(val).toLowerCase().includes(value)
                }
            })
        }

        return filterType().filter(isMatch)
    }

    function filterType(): TotalData[] {
        if (type === 'education') {
            return totalData.filter((data) => data.type === 'education')
        } else if (type === 'experience') {
            return totalData.filter((data) => data.type === 'experience')
        } else {
            return totalData
        }
    }

    return (
        <div className="flex flex-col">
            <div className="flex w-full justify-center gap-2 md:justify-start lg:w-1/2">
                <SearchBar value={search} onChange={setSearch} />
                <NewDropdown />
            </div>
            <div className="flex w-full flex-col gap-4 pt-4">
                {filteredData.map((data, index) => (
                    <DataRender key={`${data.type} ${data.object.id} ${index}`} item={data} />
                ))}
                {filteredData.length === 0 && <p>No items found</p>}
            </div>
        </div>
    )
}
