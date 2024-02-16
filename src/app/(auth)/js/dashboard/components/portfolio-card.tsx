import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import portfolioIdRoute from '../../portfolio/[id]/_route'
import Portfolio from '@/lib/types/portfolio/portfolio'
import { Hammer, ListChecks, School2Icon } from 'lucide-react'
import ApplicationLabel from '@/components/labels/application-label'

interface PortfolioCardProps {
    portfolio: Portfolio
}

interface QuickInfoProp {
    icon: React.ReactNode
    text: string
    count: number
    label: string
    item: any
}

function QuickInfo({ icon, text, count, label, item }: QuickInfoProp) {
    return (
        <div className="flex max-w-full flex-nowrap">
            <div className="">{icon}</div>
            {item ? (
                <div className="flex shrink flex-col truncate">
                    <p className="truncate text-sm">{text}</p>
                    {count > 0 && (
                        <p className="text-sm text-gray-400">
                            and {count} other {label}
                            {count > 1 ? 's' : ''}
                        </p>
                    )}
                </div>
            ) : (
                <p className="text-sm">No {label}s yet</p>
            )}
        </div>
    )
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
    const topEducation = portfolio.education[0]
    const otherEducationCount = portfolio.education.length - 1

    const topExperience = portfolio.experience[0]
    const otherExperienceCount = portfolio.experience.length - 1

    const topSkill = portfolio.skills[0]
    const otherSkillsCount = portfolio.skills.length - 1

    return (
        <Link href={portfolioIdRoute(portfolio.id)} className="w-96">
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-lg">{portfolio.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            <QuickInfo
                                icon={<School2Icon className="mr-2 h-5 w-5" />}
                                text={`${topEducation?.degree} of ${topEducation?.fieldOfStudy}`}
                                count={otherEducationCount}
                                label="education"
                                item={topEducation}
                            />
                            <QuickInfo
                                icon={<Hammer className="mr-2 h-5 w-5" />}
                                text={`${topExperience?.position} at ${topExperience?.company.companyName}`}
                                count={otherExperienceCount}
                                label="experience"
                                item={topExperience}
                            />
                            <QuickInfo
                                icon={<ListChecks className="mr-2 h-5 w-5" />}
                                text={`skill`}
                                count={otherSkillsCount}
                                label="skill"
                                item={topSkill}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
