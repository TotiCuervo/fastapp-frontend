import React from 'react'
import ResumeIcon from '../icons/resume-icon'

interface IProps {
    count: number
}

export default function ResumeLabel({ count }: IProps) {
    return (
        <p className="inline-block flex items-center align-middle text-sm text-gray-500">
            <ResumeIcon className="mr-0.5 h-5" />
            {count} Resume{count > 1 || count === 0 ? 's' : ''}
        </p>
    )
}
