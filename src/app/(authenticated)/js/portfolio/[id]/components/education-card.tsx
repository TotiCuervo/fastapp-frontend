'use client'
import CopiableCard from '@/components/copy/copiable-card'
import CT from '@/components/copy/copiable-text'
import CardOptionsDropdown from '@/components/dropdown/card-options-dropdown'
import AddEducationModal from '@/components/modals/education-form-modal'
import EducationDeleteModal from '@/components/modals/delete-modals/modals/education-delete-modal'
import Education from '@/lib/types/education/education'
import React, { useState } from 'react'
import EducationIcon from '@/components/icons/education-icon'

interface IProps {
    education: Education
    invalidation?: () => void
}

export default function EducationCard({ education, invalidation }: IProps) {
    const school = education.school
    const degree = `${education.degree}, ${education.fieldOfStudy}`
    const start = `${education.startedOn.monthName.short} ${education.startedOn.year.toString()}`
    const end = `${education.endedOn.monthName.short} ${education.endedOn.year.toString()}`

    const [hoveringChild, setHoveringChild] = useState(false)
    const [openExperienceModal, setOpenExperienceModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    return (
        <>
            <CopiableCard copyText="Education" hoveringChild={hoveringChild}>
                <div className="flex w-full justify-between">
                    <div className="flex items-center gap-1 pb-2 text-sm text-foreground/70">
                        <EducationIcon className="size-5 text-foreground/60" />
                        <p>Education</p>
                    </div>
                    <CardOptionsDropdown
                        handleDeleteClick={() => setOpenDeleteModal(true)}
                        handleEditClick={() => setOpenExperienceModal(true)}
                    />
                </div>
                <CT className="font-semibold" hovering={setHoveringChild}>
                    {school}
                </CT>
                <CT hovering={setHoveringChild}>{degree}</CT>
                <CT className="font-light" hovering={setHoveringChild}>{`${start} - ${end}`}</CT>
            </CopiableCard>
            <AddEducationModal
                open={openExperienceModal}
                setOpen={setOpenExperienceModal}
                onSuccessfullSubmit={invalidation}
                education={education}
            />
            <EducationDeleteModal
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                education={education}
                onSuccessfulDelete={invalidation}
            />
        </>
    )
}
