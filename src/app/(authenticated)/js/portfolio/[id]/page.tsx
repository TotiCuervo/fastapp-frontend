'use client'

import Button from '@/components/buttons/button'
import usePortfolioQuery from '@/lib/query/portfolios/usePortfolioQuery'
import { notFound } from 'next/navigation'
import React from 'react'
import Section from './components/section'
import AddEducationModal from '@/components/modals/education-form-modal'
import AddExperienceModal from '@/components/modals/experience-form-modal'
import EducationCard from './components/education-card'
import ExperienceCard from './components/experience-card'
import usePortfolioQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfolioQueryInvalidation'
import PageHeader from './components/page-header'
import usePortfoliosQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfoliosQueryInvalidation'
import SkillFormModal from '@/components/modals/skill-form-modal'
import EmptyCard from './components/empty-card'
import ExperienceIcon from '@/components/icons/experience-icon'
import EducationIcon from '@/components/icons/education-icon'
import SkillIcon from '@/components/icons/skill-icon'
import SkillPill from '@/components/skills/skill-pill'

interface IProps {
    params: {
        id: string
    }
}

const AddButton = () => <Button variant="ghost">Add</Button>

export default function page({ params }: IProps) {
    const { id } = params
    const intId = parseInt(id)
    const { data, isLoading } = usePortfolioQuery({ id: intId })
    const invalidate = usePortfolioQueryInvalidation()
    const portfoliosInvalidation = usePortfoliosQueryInvalidation()
    const bothInvalidation = () => {
        invalidate(intId)
        portfoliosInvalidation()
    }

    if (!isLoading && data === undefined) {
        notFound()
    }

    if (data === undefined) {
        return <></>
    }

    function invalidation() {
        invalidate(intId)
    }

    console.log({ data })

    return (
        <div className="flex flex-col gap-10">
            <PageHeader portfolio={data} invalidation={bothInvalidation} />
            <Section
                title="Work Experience"
                addModal={
                    <AddExperienceModal
                        trigger={<AddButton />}
                        portfolioId={intId}
                        onSuccessfullSubmit={invalidation}
                    />
                }
                showIf="experience"
            >
                <div className="flex flex-col gap-4">
                    {data.experience.map((experience, index) => (
                        <ExperienceCard
                            key={`experience ${index}`}
                            experience={experience}
                            portfolioId={intId}
                            invalidation={invalidation}
                        />
                    ))}
                </div>
                {data.experience.length === 0 && (
                    <EmptyCard
                        Icon={ExperienceIcon}
                        item={'experience'}
                        AddModal={({ ...props }: any) => (
                            <AddExperienceModal {...props} portfolioId={intId} onSuccessfullSubmit={invalidation} />
                        )}
                    />
                )}
            </Section>
            <Section
                title="Education"
                addModal={
                    <AddEducationModal trigger={<AddButton />} portfolioId={intId} onSuccessfullSubmit={invalidation} />
                }
                showIf="education"
            >
                {data.education.map((education, index) => (
                    <EducationCard key={`education ${index}`} education={education} invalidation={invalidation} />
                ))}
                {data.education.length === 0 && (
                    <EmptyCard
                        Icon={EducationIcon}
                        item={'education'}
                        AddModal={({ ...props }: any) => (
                            <AddEducationModal {...props} portfolioId={intId} onSuccessfullSubmit={invalidation} />
                        )}
                    />
                )}
            </Section>
            <Section
                title="Skills"
                addModal={
                    <SkillFormModal
                        trigger={<AddButton />}
                        portfolioId={intId}
                        onSuccessfullSubmit={invalidation}
                        skills={data.skills}
                    />
                }
                showIf="skills"
            >
                <div className="flex flex-wrap gap-4">
                    {data.skills.map((skill, index) => (
                        <SkillPill key={`skill ${index}`}>{skill.skillSet}</SkillPill>
                    ))}
                </div>
                {data.skills.length === 0 && (
                    <EmptyCard
                        Icon={SkillIcon}
                        item={'skill'}
                        AddModal={({ ...props }: any) => (
                            <SkillFormModal {...props} portfolioId={intId} onSuccessfullSubmit={invalidation} />
                        )}
                    />
                )}
            </Section>
        </div>
    )
}
