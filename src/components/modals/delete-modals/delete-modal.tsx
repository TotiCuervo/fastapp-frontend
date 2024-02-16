'use client'

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Button from '@/components/buttons/button'
import useInternalOpen from '@/lib/hooks/use-internal-open'
import InternalOpenProps from '@/lib/types/misc/internal-dialog-props'
import { useState } from 'react'
import { Alert } from '@/lib/types/alert'
import Alerter from '@/components/alerts/alerter'

interface DeleteDialogModalProps extends InternalOpenProps {
    title: string
    onDelete: () => Promise<void>
}

export default function DeleteDialogModal({
    open,
    setOpen,
    trigger,
    triggerClassName,
    title,
    onDelete,
}: DeleteDialogModalProps) {
    const { internalOpen, handleSetOpen } = useInternalOpen({ open, setOpen })
    const [error, setError] = useState<Alert | undefined>(undefined)
    const [deleting, setDeleting] = useState(false)

    async function handleDelete() {
        setDeleting(true)
        setError(undefined)
        try {
            await onDelete()
        } catch (e) {
            setError({
                message: 'An error occurred while deleting',
                type: 'danger',
                show: true,
            })
        }
    }

    return (
        <Dialog
            open={internalOpen}
            onOpenChange={handleSetOpen}
        >
            {trigger && <DialogTrigger className={triggerClassName}>{trigger}</DialogTrigger>}
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Delete {title}</DialogTitle>
                </DialogHeader>
                <Alerter alert={error} />
                <div className="flex flex-col gap-1">
                    <span className="text-lg font-semibold">
                        Are you sure you want to
                        <span className="text-destructive"> delete </span>
                        this {title.toLowerCase()}?
                    </span>
                    <span className="text-sm">This action cannot be undone.</span>
                </div>
                <DialogFooter className="flex w-full justify-end gap-2">
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose onClick={handleDelete}>
                        <Button
                            variant="destructive"
                            loading={deleting}
                            loadingText="Deleting..."
                        >
                            Delete
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
