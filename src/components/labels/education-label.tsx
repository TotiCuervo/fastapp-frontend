import React from 'react'
import JobIcon from '../icons/job-icon'

interface IProps {
    count: number
}

export default function ApplicationLabel({ count }: IProps) {
    return (
        <p className="inline-block flex items-center align-middle text-sm text-gray-500">
            <JobIcon className="mr-0.5 h-5" />
            {count} Application{count > 1 || count === 0 ? 's' : ''}
        </p>
    )
}
