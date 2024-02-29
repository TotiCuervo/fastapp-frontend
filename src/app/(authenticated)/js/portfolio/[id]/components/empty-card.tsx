import Button from '@/components/buttons/button'
import React, { useState } from 'react'

interface IProps {
    Icon: ({ ...props }: any) => React.JSX.Element
    item: string
    AddModal: ({ ...props }: any) => React.JSX.Element
}

export default function EmptyCard({ Icon, item, AddModal }: IProps) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div
                className="group flex cursor-pointer flex-col items-center rounded-xl border-[1.5px] border-dashed border-foreground/40 p-4 transition hover:border-foreground hover:bg-card"
                onClick={() => setOpen(true)}
            >
                <Icon className="text-foreground/40 transition group-hover:text-foreground" />
                <span className="font-medium">You do not have any {item}s yet!</span>
                <span className="text-muted-foreground">Add your first {item}</span>
                <div className="mt-4">
                    <Button onClick={() => setOpen(true)}>Add {item}</Button>
                </div>
            </div>
            <AddModal open={open} setOpen={setOpen} />
        </>
    )
}
