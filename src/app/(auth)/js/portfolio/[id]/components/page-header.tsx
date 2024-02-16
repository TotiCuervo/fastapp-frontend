import CardOptionsDropdown from '@/components/dropdown/card-options-dropdown'
import PortfolioDeleteModal from '@/components/modals/delete-modals/modals/portfolio-delete-modal'
import PortfolioFormModal from '@/components/modals/portfolio-form-modal'
import jsDashboardRoute from '@/lib/routes/jsDashboardRoute'
import Portfolio from '@/lib/types/portfolio/portfolio'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

interface IProps {
    portfolio: Portfolio
    invalidation: () => void
}

export default function PageHeader({ portfolio, invalidation }: IProps) {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const router = useRouter()

    function onDelete() {
        router.push(jsDashboardRoute())
    }

    return (
        <>
            <div className="flex w-full justify-between">
                <h1 className="text-4xl font-bold">{portfolio.name}</h1>
                <CardOptionsDropdown
                    handleEditClick={() => setOpenEditModal(true)}
                    handleDeleteClick={() => setOpenDeleteModal(true)}
                />
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
