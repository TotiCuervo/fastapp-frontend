'use client'
import CopiableCard from '@/components/copy/copiable-card'
import CT from '@/components/copy/copiable-text'
import { EllipsisDropdownMenu } from '@/components/dropdown/ellipsis-dropdown'
import Experience from '@/lib/types/experience/experience'
import React, { useState } from 'react'
import ExperienceCardDropdown from './components/experience-card-dropdown'

interface IProps {
    experience: Experience
}

export default function ExperienceCard({ experience }: IProps) {
    const { position, location, experienceType } = experience
    const company = experience.company.companyName
    const start = `${experience.startedOn.monthName.short} ${experience.startedOn.year.toString()}`
    const end = experience.isCurrent
        ? 'Present'
        : `${experience.endedOn?.monthName.short} ${experience.endedOn?.year.toString()}`

    const copyText = `${position}. ${company}, ${location}. ${experienceType} from ${start} to ${end}`
    const [hoveringChild, setHoveringChild] = useState(false)

    return (
        <CopiableCard copyText={copyText} hoveringChild={hoveringChild}>
            <div className="flex justify-between">
                <i className="pb-2">Experience</i>
                <ExperienceCardDropdown />
            </div>
            <CT className="font-semibold" hovering={setHoveringChild}>
                {position}
            </CT>
            <div className="flex gap-2">
                <CT hovering={setHoveringChild}>{company}</CT>•<CT hovering={setHoveringChild}>{location}</CT>
            </div>
            <div className="flex gap-4">
                <CT className="font-light" hovering={setHoveringChild}>
                    {experienceType}
                </CT>
                <CT className="font-light" hovering={setHoveringChild}>{`${start} - ${end}`}</CT>
            </div>
            <CT className="pt-1" hovering={setHoveringChild}>
                {experience.description}
            </CT>
        </CopiableCard>
    )
}
