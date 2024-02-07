'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import AddEducationForm from '../forms/add-education-form'

interface AddEducationModalProps {
    trigger?: React.ReactNode
    open?: boolean
}

export default function AddEducationModal({ trigger, open }: AddEducationModalProps) {
    return (
        <Dialog>
            {trigger && <DialogTrigger>{trigger}</DialogTrigger>}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Education</DialogTitle>
                    <div className="pt-4">
                        <AddEducationForm />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
