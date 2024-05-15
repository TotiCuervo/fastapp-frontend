import Button from '@/components/buttons/button'
import CardOptionsDropdown from '@/components/dropdown/card-options-dropdown'
import PortfolioDeleteModal from '@/components/modals/delete-modals/modals/portfolio-delete-modal'
import PortfolioFormModal from '@/components/modals/portfolio-form-modal'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import Portfolio from '@/lib/types/portfolio/portfolio'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import CT from '@/components/copy/copiable-text'

interface IProps {
    portfolio: Portfolio
    invalidation: () => void
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
]

export default function PageHeader({ portfolio, invalidation }: IProps) {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const router = useRouter()

    function onDelete() {
        invalidation()
        router.push(jsDashboardRoute())
    }

    return (
        <>
            <div className="border-b pb-4 ">
                <div className="flex flex-col">
                    <div className="flex w-full justify-between">
                        <h1 className="text-3xl font-bold">{portfolio.name}</h1>

                        <div>
                            <div className="flex gap-2 sm:hidden">
                                <CardOptionsDropdown
                                    handleEditClick={() => setOpenEditModal(true)}
                                    handleDeleteClick={() => setOpenDeleteModal(true)}
                                />
                            </div>

                            <div className="hidden gap-2 sm:flex">
                                <Button variant="ghost" onClick={() => setOpenDeleteModal(true)}>
                                    Delete
                                </Button>
                                <Button variant={'outline'} onClick={() => setOpenEditModal(true)}>
                                    Edit
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 pt-4">
                        {basicInformation.map((info, index) => (
                            <div key={index} className="flex flex-col">
                                <span className="font-semibold">{info.title}</span>
                                <CT>{info.content}</CT>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <PortfolioFormModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                onSuccessfullSubmit={invalidation}
                portfolio={portfolio}
            />
            <PortfolioDeleteModal
                portfolio={portfolio}
                onSuccessfulDelete={onDelete}
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
            />
        </>
    )
}
