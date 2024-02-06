import React from 'react'
import ResumeIcon from '../icons/resume-icon'
import OtherAnswerIcon from '../icons/other-answer-icon'

interface IProps {
    count: number
}

export default function OtherAnswersLabel({ count }: IProps) {
    return (
        <p className="inline-block flex items-center align-middle text-sm text-gray-500">
            <OtherAnswerIcon className="mr-0.5 h-5" />
            {count} Other Answer{count > 1 || count === 0 ? 's' : ''}
        </p>
    )
}
