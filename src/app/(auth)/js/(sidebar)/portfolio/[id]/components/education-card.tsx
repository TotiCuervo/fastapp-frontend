'use client'
import CopiableCard from '@/components/copy/copiable-card'
import CT from '@/components/copy/copiable-text'
import Education from '@/lib/types/education/education'
import React, { useState } from 'react'

interface IProps {
    education: Education
}

export default function EducationCard({ education }: IProps) {
    const school = education.school
    const degree = `${education.degree}, ${education.fieldOfStudy}`
    const start = `${education.startedOn.monthName.short} ${education.startedOn.year.toString()}`
    const end = `${education.endedOn.monthName.short} ${education.endedOn.year.toString()}`

    const [hoveringChild, setHoveringChild] = useState(false)

    return (
        <CopiableCard
            copyText="Education"
            hoveringChild={hoveringChild}
        >
            <i className="pb-1">Education</i>
            <CT
                className="font-semibold"
                hovering={setHoveringChild}
            >
                {school}
            </CT>
            <CT hovering={setHoveringChild}>{degree}</CT>
            <CT
                className="font-light"
                hovering={setHoveringChild}
            >{`${start} - ${end}`}</CT>
        </CopiableCard>
    )
}
