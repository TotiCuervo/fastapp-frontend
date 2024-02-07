'use client'

import Button from '@/components/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import usePortfolioQuery from '@/lib/query/portfolios/usePortfolioQuery'
import { notFound, useRouter } from 'next/navigation'
import React from 'react'
import DetailCard from './components/detail-card'
import Section from './components/section'
import AddEducationModal from '@/components/modals/add-education-modal'

interface IProps {
    params: {
        id: string
    }
}

interface BasicInfo {
    title: string
    content: string
}

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
    // {
    //     title: 'Are you authorized to work in the US?',
    //     content: 'Yes'
    // },
    // {
    //     title: 'Will you now or in the future require sponsorship for employment visa status?',
    //     content: 'No'
    // },
    // {
    //     title: 'Do you have a disability?',
    //     content: 'No'
    // },
    // {
    //     title: 'Are you a veteran?',
    //     content: 'No'
    // },
    // {
    //     title: 'What is your gender?',
    //     content: 'Male'
    // }
]

export default function page({ params }: IProps) {
    const { id } = params
    const { data, isLoading } = usePortfolioQuery({ id })

    if (!isLoading && data === undefined) {
        notFound()
    }

    if (data === undefined) {
        return <></>
    }

    return (
        <div className="mx-auto flex w-full max-w-[70%] flex-col gap-4">
            <h1 className="text-4xl font-bold">{data.name}</h1>
            <div className="flex flex-wrap gap-10">
                {basicInformation.map((info, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="font-semibold">{info.title}</span>
                        <p>{info.content}</p>
                    </div>
                ))}
            </div>

            <div className="flex gap-10 pt-8">
                <div className="flex grow flex-col gap-10">
                    <Section title="Work Experience" addModal={<></>}>
                        <DetailCard title="What is your ethnicity?" content={'Hispanic/Latinx'} />
                        <DetailCard title="Are you Authorized to work in the US?" content={'Yes'} />
                        <DetailCard title="What is your ethnicity?" content={'Hispanic/Latinx'} />
                        <DetailCard title="Are you Authorized to work in the US?" content={'Yes'} />
                    </Section>
                    <Section
                        title="Education"
                        addModal={<AddEducationModal trigger={<Button variant="ghost">Add</Button>} />}
                    >
                        <DetailCard title="What is your ethnicity?" content={'Hispanic/Latinx'} />
                        <DetailCard title="Are you Authorized to work in the US?" content={'Yes'} />
                        <DetailCard title="What is your ethnicity?" content={'Hispanic/Latinx'} />
                        <DetailCard title="Are you Authorized to work in the US?" content={'Yes'} />
                    </Section>
                </div>
            </div>
        </div>
    )
}
