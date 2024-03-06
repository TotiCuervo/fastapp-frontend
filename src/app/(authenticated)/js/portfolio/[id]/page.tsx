'use client'

import Button from '@/components/buttons/button'
import usePortfolioQuery from '@/lib/query/portfolios/usePortfolioQuery'
import { notFound } from 'next/navigation'
import React from 'react'
import Section from './components/section'
import AddEducationModal from '@/components/modals/education-form-modal'
import AddExperienceModal from '@/components/modals/experience-form-modal'
import EducationCard from './components/education-card'
import CT from '@/components/copy/copiable-text'
import ExperienceCard from './components/experience-card'
import usePortfolioQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfolioQueryInvalidation'
import PageHeader from './components/page-header'
import usePortfoliosQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfoliosQueryInvalidation'
import TypeFilterItems from '../../components/shared/type-filter-items'
import portfolioIdRoute from './_route'
import SkillFormModal from '@/components/modals/skill-form-modal'
import PortfolioFilterItems from '../../components/shared/portfolio-filter-items'
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

interface BasicInfo {
    title: string
    content: string
}

const AddButton = () => <Button variant="ghost">Add</Button>

const basicInformation: BasicInfo[] = [
    {
        title: 'Email',
        content: 'cuervor14@gmail.com',
    },
    {
        title: 'Phone',
        content: '123-456-7890',
    },
    {
        title: 'Birthday',
        content: '01/01/1990',
    },
    {
        title: 'Location',
        content: 'Columbus, OH, USA',
    },
]

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

    return (
        <div className="flex w-full flex-col gap-4">
            <div className="flex justify-center">
                <div className="w-full md:w-8/12 lg:w-8/12">
                    <div className="flex flex-col gap-10">
                        <PageHeader
                            portfolio={data}
                            invalidation={bothInvalidation}
                        />
                        <Section
                            title="Basic Information"
                            addModal={
                                <AddExperienceModal
                                    trigger={<AddButton />}
                                    portfolioId={intId}
                                    onSuccessfullSubmit={invalidation}
                                />
                            }
                            toggleable
                        >
                            <div className="flex flex-col gap-4">
                                {basicInformation.map((info, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col"
                                    >
                                        <span className="font-semibold">{info.title}</span>
                                        <CT>{info.content}</CT>
                                    </div>
                                ))}
                            </div>
                        </Section>
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
                            <div className="flex  flex-col gap-4">
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
                                        <AddExperienceModal
                                            {...props}
                                            portfolioId={intId}
                                            onSuccessfullSubmit={invalidation}
                                        />
                                    )}
                                />
                            )}
                        </Section>
                        <Section
                            title="Education"
                            addModal={
                                <AddEducationModal
                                    trigger={<AddButton />}
                                    portfolioId={intId}
                                    onSuccessfullSubmit={invalidation}
                                />
                            }
                            showIf="education"
                        >
                            {data.education.map((education, index) => (
                                <EducationCard
                                    key={`education ${index}`}
                                    education={education}
                                    invalidation={invalidation}
                                />
                            ))}
                            {data.education.length === 0 && (
                                <EmptyCard
                                    Icon={EducationIcon}
                                    item={'education'}
                                    AddModal={({ ...props }: any) => (
                                        <AddEducationModal
                                            {...props}
                                            portfolioId={intId}
                                            onSuccessfullSubmit={invalidation}
                                        />
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
                                    <SkillPill key={`skill ${index}`}>Howdy</SkillPill>
                                ))}
                            </div>
                            {data.skills.length === 0 && (
                                <EmptyCard
                                    Icon={SkillIcon}
                                    item={'skill'}
                                    AddModal={({ ...props }: any) => (
                                        <SkillFormModal
                                            {...props}
                                            portfolioId={intId}
                                            onSuccessfullSubmit={invalidation}
                                        />
                                    )}
                                />
                            )}
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    )
}
