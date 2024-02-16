'use client'

import Button from '@/components/buttons/button'
import usePortfolioQuery from '@/lib/query/portfolios/usePortfolioQuery'
import { notFound } from 'next/navigation'
import React from 'react'
import Section from './components/section'
import AddEducationModal from '@/components/modals/add-education-modal'
import AddExperienceModal from '@/components/modals/experience-form-modal'
import EducationCard from './components/education-card'
import CT from '@/components/copy/copiable-text'
import ExperienceCard from './components/experience-card'
import usePortfolioQueryInvalidation from '@/lib/query/portfolios/invalidations/usePortfolioQueryInvalidation'
import PageHeader from './components/page-header'

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
        content: 'cuervor14@gmail.com'
    },
    {
        title: 'Phone',
        content: '123-456-7890'
    },
    {
        title: 'Birthday',
        content: '01/01/1990'
    },
    {
        title: 'Location',
        content: 'Columbus, OH, USA'
    }
]

export default function page({ params }: IProps) {
    const { id } = params
    const intId = parseInt(id)
    const { data, isLoading } = usePortfolioQuery({ id: intId })
    const invalidate = usePortfolioQueryInvalidation()

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
        <div className="mx-auto flex w-full max-w-[50%] flex-col gap-4">
            <PageHeader portfolio={data} invalidation={invalidation} />
            <div className="flex flex-wrap gap-10">
                {basicInformation.map((info, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="font-semibold">{info.title}</span>
                        <CT>{info.content}</CT>
                    </div>
                ))}
            </div>

            <div className="flex gap-10 pt-8">
                <div className="flex grow flex-col gap-10">
                    <Section
                        title="Work Experience"
                        addModal={
                            <AddExperienceModal
                                trigger={<AddButton />}
                                portfolioId={intId}
                                onSuccessfullSubmit={invalidation}
                            />
                        }
                    >
                        {data.experience.map((experience, index) => (
                            <ExperienceCard
                                key={`experience ${index}`}
                                experience={experience}
                                portfolioId={intId}
                                invalidation={invalidation}
                            />
                        ))}
                        {data.experience.length === 0 && <p className="w-full text-center">No experience, yet</p>}
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
                    >
                        {data.education.map((education, index) => (
                            <EducationCard
                                key={`education ${index}`}
                                education={education}
                                invalidation={invalidation}
                            />
                        ))}
                        {data.education.length === 0 && <p className="w-full text-center">No education, yet</p>}
                    </Section>
                </div>
            </div>
        </div>
    )
}
