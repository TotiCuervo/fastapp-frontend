'use client'
import DeleteDialogModal from '../delete-modal'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import Portfolio from '@/lib/types/portfolio/portfolio'
import deletePortfolio from '@/lib/endpoints/portfolio/delete-portfolio'

interface DeleteModalProps extends InternalOpenProps {
    portfolio: Portfolio
    onSuccessfulDelete?: () => void
}
export default function PortfolioDeleteModal({ portfolio, onSuccessfulDelete, ...props }: DeleteModalProps) {
    async function onConfirmDelete() {
        await deletePortfolio({ id: portfolio.id })
        onSuccessfulDelete?.()
    }

    return <DeleteDialogModal title={'Portfolio'} onDelete={onConfirmDelete} {...props} />
}
