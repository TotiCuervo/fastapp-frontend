'use client'
import Experience from '@/lib/types/experience/experience'
import DeleteDialogModal from '../delete-modal'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import deleteUserExperience from '@/lib/endpoints/experience/delete-user-experience'
import { useUserContext } from '@/context/UserContext'

interface ExperienceDeleteModalProps extends InternalOpenProps {
    experience: Experience
    onSuccessfulDelete?: () => void
}
export default function ExperienceDeleteModal({
    experience,
    onSuccessfulDelete,
    ...props
}: ExperienceDeleteModalProps) {
    const { user } = useUserContext()

    async function onConfirmDelete() {
        await deleteUserExperience({ userId: user!.id, id: experience.id })
        onSuccessfulDelete?.()
    }

    return (
        <DeleteDialogModal
            title={'Experience'}
            onDelete={onConfirmDelete}
            {...props}
        />
    )
}
