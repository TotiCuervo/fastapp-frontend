import Button from '@/components/buttons/button'
import ApplicationResumeLabelRow from '@/components/labels/stats-row'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

interface Answer {
    answer: string
    resumes: number
    applications: number
}

interface Question {
    question: string
    answer: Answer
    otherAnswersCount: number
}

const questions: Question[] = [
    {
        question: 'Who wrote "To Kill a Mockingbird"?',
        answer: {
            answer: 'Harper Lee',
            resumes: 4,
            applications: 1,
        },
        otherAnswersCount: 2,
    },
    {
        question: 'Can you explain the process of photosynthesis in plants?',
        answer: {
            answer: 'Photosynthesis is how plants convert sunlight, water, and carbon dioxide into oxygen and glucose, essentially feeding themselves and producing vital oxygen.',
            resumes: 4,
            applications: 1,
        },
        otherAnswersCount: 2,
    },
    {
        question: 'What year did the first man land on the Moon?',
        answer: {
            answer: '1969',
            resumes: 3,
            applications: 2,
        },
        otherAnswersCount: 0,
    },
    {
        question: 'What role did Leonardo da Vinci play in the Renaissance era?',
        answer: {
            answer: 'A polymath, Leonardo was an artist, scientist, and inventor, significantly contributing to art, anatomy, engineering, and humanism during the Renaissance.',
            resumes: 6,
            applications: 3,
        },
        otherAnswersCount: 1,
    },
    {
        question: 'What is the chemical formula for water?',
        answer: {
            answer: 'H2O',
            resumes: 5,
            applications: 2,
        },
        otherAnswersCount: 1,
    },
    {
        question: 'What was the impact of the printing press invention by Johannes Gutenberg?',
        answer: {
            answer: 'It revolutionized information dissemination, making books accessible, fostering literacy, spreading ideas, and significantly impacting the Renaissance and Reformation.',
            resumes: 2,
            applications: 0,
        },
        otherAnswersCount: 3,
    },
    {
        question: 'Discuss the historical significance of the Silk Road in global trade.',
        answer: {
            answer: 'The Silk Road facilitated the exchange of goods, cultures, and ideas between the East and West, shaping early globalization and cultural interactions.',
            resumes: 3,
            applications: 1,
        },
        otherAnswersCount: 1,
    },
    {
        question: 'What gas do plants absorb during photosynthesis?',
        answer: {
            answer: 'Carbon Dioxide (CO2)',
            resumes: 4,
            applications: 1,
        },
        otherAnswersCount: 2,
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answer: {
            answer: 'Mars, due to its reddish appearance caused by iron oxide',
            resumes: 5,
            applications: 2,
        },
        otherAnswersCount: 1,
    },
    {
        question: 'How do black holes challenge our understanding of physics?',
        answer: {
            answer: 'Black holes, with extreme gravity affecting time and space, challenge conventional physics, particularly in understanding singularity and event horizon phenomena.',
            resumes: 6,
            applications: 3,
        },
        otherAnswersCount: 2,
    },
]

export default function page() {
    return (
        <div className="flex w-full flex-col">
            <h1 className="text-2xl font-bold">Question Bank</h1>
            <p className="mt-2 text-gray-600">All of your questions are stored here for easy access and assigning</p>
            <div className="mt-10 flex gap-3">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search"
                        className="w-96 pl-8"
                    />
                </div>
                <Button>Add Question</Button>
            </div>
            <div className="mt-2 flex w-3/4 flex-col">
                {questions.map((question, index) => (
                    <div className="flex-grow cursor-pointer border-b px-4 py-8 transition last:border-none hover:bg-accent">
                        <span className="italic text-gray-500">{question.question}</span>
                        <p className="mt-4 font-semibold">{question.answer.answer}</p>
                        <ApplicationResumeLabelRow
                            applicationCount={question.answer.applications}
                            resumeCount={question.answer.resumes}
                            otherAnswersCount={question.otherAnswersCount}
                            className="mt-3"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
