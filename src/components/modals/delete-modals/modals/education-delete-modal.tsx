'use client'
import DeleteDialogModal from '../delete-modal'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import { useUserContext } from '@/context/UserContext'
import Education from '@/lib/types/education/education'
import deleteUserEducation from '@/lib/endpoints/education/delete-user-education'

interface EducationDeleteModalProps extends InternalOpenProps {
    education: Education
    onSuccessfulDelete?: () => void
}
export default function EducationDeleteModal({ education, onSuccessfulDelete, ...props }: EducationDeleteModalProps) {
    const { user } = useUserContext()

    async function onConfirmDelete() {
        await deleteUserEducation({ userId: user!.id, id: education.id })
        onSuccessfulDelete?.()
    }

    return (
        <DeleteDialogModal
            title={'Education'}
            onDelete={onConfirmDelete}
            {...props}
        />
    )
}
