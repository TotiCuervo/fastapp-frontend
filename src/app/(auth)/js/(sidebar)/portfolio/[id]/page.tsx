'use client'

import Button from '@/components/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import usePortfolioQuery from '@/lib/query/portfolios/usePortfolioQuery'
import { notFound, useRouter } from 'next/navigation'
import React from 'react'
import DetailCard from './components/detail-card'
import Section from './components/section'

interface IProps {
    params: {
        id: string
    }
}

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

            <div className="flex gap-10 pt-8">
                <div className="flex shrink flex-col gap-10">
                    <Section title="Contact Info">
                        <DetailCard
                            title="Email"
                            content={'cuervor14@gmail.com'}
                        />
                        <DetailCard
                            title="Phone Number"
                            content={'901694116'}
                        />
                    </Section>
                    <Section title="Equal Employment">
                        <DetailCard
                            title="What is your ethnicity?"
                            content={'Hispanic/Latinx'}
                        />
                        <DetailCard
                            title="Are you Authorized to work in the US?"
                            content={'Yes'}
                        />
                    </Section>
                </div>
                <div className="flex grow flex-col gap-10">
                    <Section title="Work Experience">
                        <DetailCard
                            title="What is your ethnicity?"
                            content={'Hispanic/Latinx'}
                        />
                        <DetailCard
                            title="Are you Authorized to work in the US?"
                            content={'Yes'}
                        />
                        <DetailCard
                            title="What is your ethnicity?"
                            content={'Hispanic/Latinx'}
                        />
                        <DetailCard
                            title="Are you Authorized to work in the US?"
                            content={'Yes'}
                        />
                    </Section>
                    <Section title="Education">
                        <DetailCard
                            title="What is your ethnicity?"
                            content={'Hispanic/Latinx'}
                        />
                        <DetailCard
                            title="Are you Authorized to work in the US?"
                            content={'Yes'}
                        />
                        <DetailCard
                            title="What is your ethnicity?"
                            content={'Hispanic/Latinx'}
                        />
                        <DetailCard
                            title="Are you Authorized to work in the US?"
                            content={'Yes'}
                        />
                    </Section>
                </div>
            </div>
        </div>
    )
}
