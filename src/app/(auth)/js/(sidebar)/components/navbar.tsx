'use client'
import NavbarContainer from '@/components/navbar/navbar-container'
import NavbarGroup from '@/components/navbar/navbar-group'
import NavbarItem from '@/components/navbar/navbar-item'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import jsQuestionBankRoute from '@/lib/routes/jsQuestionBankRoute'
import UserDropdown from './user-dropdown'
import LogoImage from '@/components/misc/logo-image'
import jobsRoute from '@/lib/routes/jobsRoute'
import jsApplicationsRoute from '@/lib/routes/jsApplicationsRoute'
import jsResumesRoute from '@/lib/routes/jsResumesRoute'

export default function Navbar() {
    return (
        <NavbarContainer>
            <NavbarGroup justify="between">
                <NavbarGroup gap={10}>
                    <LogoImage size={50} />
                    <NavbarItem
                        href={jsDashboardRoute()}
                        text="Dashboard"
                    />
                    {/* <NavbarItem
                        href={jsQuestionBankRoute()}
                        text="Question Bank"
                    />
                    <NavbarItem
                        href={jsResumesRoute()}
                        text="Resumes"
                    />
                    <NavbarItem
                        href={jsApplicationsRoute()}
                        text="Applications"
                    />
                    <NavbarItem
                        href={jobsRoute()}
                        text="Jobs"
                    /> */}
                </NavbarGroup>
                <UserDropdown />
            </NavbarGroup>
        </NavbarContainer>
    )
}
