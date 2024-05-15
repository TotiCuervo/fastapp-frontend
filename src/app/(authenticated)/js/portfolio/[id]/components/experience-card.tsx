'use client'
import CopiableCard from '@/components/copy/copiable-card'
import CT from '@/components/copy/copiable-text'
import Experience from '@/lib/types/experience/experience'
import React, { useState } from 'react'
import CardOptionsDropdown from '../../../../../../components/dropdown/card-options-dropdown'
import Portfolio from '@/lib/types/portfolio/portfolio'
import ExperienceFormModal from '@/components/modals/experience-form-modal'
import ExperienceDeleteModal from '@/components/modals/delete-modals/modals/experience-delete-modal'
import ExperienceIcon from '@/components/icons/experience-icon'

interface IProps {
    experience: Experience
    invalidation?: () => void
    portfolioId?: Portfolio['id']
    first?: boolean
}

export default function ExperienceCard({ experience, invalidation, portfolioId }: IProps) {
    const { position, location, experienceType } = experience
    const company = experience.company.companyName
    const start = `${experience.startedOn.monthName.short} ${experience.startedOn.year.toString()}`
    const end =
        experience.endedOn?.month === null && experience.endedOn?.year === null
            ? 'Present'
            : `${experience.endedOn?.monthName?.short} ${experience.endedOn?.year?.toString()}`

    const copyText = `${position}. ${company}, ${location}. ${experienceType} from ${start} to ${end}`
    const [hoveringChild, setHoveringChild] = useState(false)
    const [openExperienceModal, setOpenExperienceModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    return (
        <>
            <CopiableCard copyText={copyText} hoveringChild={hoveringChild}>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1 pb-2 text-sm text-foreground/70">
                        <ExperienceIcon className="size-4 text-foreground/60" />
                        <p>Experience</p>
                    </div>
                    <CardOptionsDropdown
                        handleEditClick={() => setOpenExperienceModal(true)}
                        handleDeleteClick={() => setOpenDeleteModal(true)}
                    />
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
            <ExperienceFormModal
                open={openExperienceModal}
                setOpen={setOpenExperienceModal}
                experience={experience}
                onSuccessfullSubmit={invalidation}
                portfolioId={portfolioId}
            />
            <ExperienceDeleteModal
                experience={experience}
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
                onSuccessfulDelete={invalidation}
            />
        </>
    )
}
