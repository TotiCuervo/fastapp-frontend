import React from 'react'
import ApplicationLabel from './application-label'
import ResumeLabel from './resume-label'
import OtherAnswersLabel from './other-answers-label'

interface IProps {
    applicationCount?: number
    resumeCount?: number
    otherAnswersCount?: number
    className?: string
}

export default function StatsRow({ applicationCount, resumeCount, otherAnswersCount, className }: IProps) {
    return (
        <div className={`flex gap-4 ${className}`}>
            {applicationCount !== undefined && <ApplicationLabel count={applicationCount} />}
            {resumeCount !== undefined && <ResumeLabel count={resumeCount} />}
            {otherAnswersCount !== undefined && <OtherAnswersLabel count={otherAnswersCount} />}
        </div>
    )
}
