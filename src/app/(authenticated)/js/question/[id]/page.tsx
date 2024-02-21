import Button from '@/components/buttons/button'
import React from 'react'
import ResumeIcon from '@/components/icons/resume-icon'
import JobIcon from '@/components/icons/job-icon'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface Answers {
    answer: string
    resumes: number
    applications: number
}

interface Application {
    title: string
    company: string
    location?: string
}

const answers: Answers[] = [
    {
        answer: 'I have some basic knowledge about blockchain technology.',
        resumes: 5,
        applications: 3,
    },
    {
        answer: 'I have been investing in crypto since 2017 and have been following the space since then. I have also been working on a personal project that involves blockchain and smart contracts.',
        resumes: 2,
        applications: 1,
    },
    {
        answer: 'I have worked on a decentralized finance (DeFi) project.',
        resumes: 4,
        applications: 2,
    },
    {
        answer: 'I have participated in a blockchain hackathon and won an award.',
        resumes: 1,
        applications: 0,
    },
    {
        answer: 'I have invested in various cryptocurrencies and managed a portfolio.',
        resumes: 3,
        applications: 2,
    },
    {
        answer: 'I have written articles and given talks about blockchain technology.',
        resumes: 6,
        applications: 4,
    },
    {
        answer: 'I have contributed to an open-source blockchain project.',
        resumes: 2,
        applications: 1,
    },
    {
        answer: 'I have audited smart contracts for security vulnerabilities.',
        resumes: 3,
        applications: 1,
    },
    {
        answer: 'I have developed a blockchain-based voting system.',
        resumes: 2,
        applications: 0,
    },
    {
        answer: 'I have experience with different consensus algorithms like Proof of Stake (PoS) and Proof of Work (PoW).',
        resumes: 4,
        applications: 3,
    },
]

const applications: Application[] = [
    {
        title: 'Software Engineer',
        company: 'ABC Company',
        location: 'New York',
    },
    {
        title: 'Frontend Developer',
        company: 'XYZ Inc.',
        location: 'San Francisco',
    },
    {
        title: 'Product Manager',
        company: '123 Corp',
        location: 'London',
    },
    {
        title: 'Data Scientist',
        company: 'Data Co.',
        location: 'Berlin',
    },
    {
        title: 'UI/UX Designer',
        company: 'Design Studio',
        location: 'Paris',
    },
    {
        title: 'Backend Developer',
        company: 'Tech Solutions',
        location: 'Tokyo',
    },
]

export default function page() {
    return (
        <div className="flex w-full flex-col">
            <div className="flex items-end justify-between">
                <h6 className="text-lg font-semibold">Question</h6>
                <Button variant="ghost">Edit</Button>
            </div>
            <div className="mt-8">
                <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-4xl">
                    Briefly describe any crypto/blockchain experience you have if any (professional or personal is ok)
                </h1>
                <div className="mt-4 flex gap-4">
                    <p className="inline-block flex items-center align-middle text-sm text-gray-500">
                        <ResumeIcon className="mr-0.5 h-5" />1 Resume
                    </p>
                    <p className="inline-block flex items-center align-middle text-sm text-gray-500">
                        <JobIcon className="mr-0.5 h-5" />
                        {applications.length} Applications
                    </p>
                </div>
            </div>
            <div className="mt-10">
                <h6 className="text-xl font-semibold">Resumes</h6>
                <span className="text-gray-500">This question was included in the following resumes</span>
                <div className="mt-4 flex w-full gap-3 overflow-x-auto">
                    <Card>
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-start gap-3">
                                <div>
                                    <p className="font-semibold">Main Resume 1</p>
                                    <p className="inline-block flex items-center align-middle text-sm text-gray-500">
                                        <JobIcon className="mr-0.5 h-5" />
                                        10 Applications
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <div className="mt-10">
                <h6 className="text-xl font-semibold">Applications ({applications.length})</h6>
                <span className="text-gray-500">This question was included in the following applications</span>
                <div className="mt-4 flex w-full items-center gap-3">
                    {applications.slice(0, 3).map((application, index) => (
                        <Card>
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-start gap-3">
                                    <img
                                        src={`https://picsum.photos/id/${index}/200/200`}
                                        alt="avatar"
                                        className="h-10 w-10"
                                    />
                                    <div>
                                        <p className="font-semibold">Senior Full Stack Engineer</p>
                                        <p className="text-sm">A Company Name</p>
                                        <p className="text-sm text-gray-500">United States (Remote)</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                    <Button variant="ghost">View All</Button>
                </div>
            </div>
            <div className="mt-10">
                <h6 className="text-xl font-semibold">Answers ({answers.length})</h6>
                <div className="flex flex-col gap-3">
                    {answers.map((answer, index) => (
                        <div className="flex w-3/4 cursor-pointer flex-col gap-3 rounded-md p-4 transition hover:bg-accent">
                            <p className="font-medium">{answer.answer}</p>
                            <div className="flex gap-4">
                                <p className="inline-block flex items-center align-middle text-sm text-gray-500">
                                    <ResumeIcon className="mr-0.5 h-5" />
                                    {answer.resumes} Resumes
                                </p>
                                <p className="inline-block flex items-center align-middle text-sm text-gray-500">
                                    <JobIcon className="mr-0.5 h-5" />
                                    {answer.applications} Applications
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
