import { useEffect, useState } from 'react'

interface InternalOpenProps {
    open?: boolean
    setOpen?: (open: boolean) => void
}

export default function useInternalOpen({ open, setOpen }: InternalOpenProps) {
    const [internalOpen, setInternalOpen] = useState(false)

    useEffect(() => {
        if (open !== undefined) setInternalOpen(open)
    }, [open])

    function handleSetOpen(open: boolean) {
        setOpen && setOpen(open)
        setInternalOpen(open)
    }
    return {
        internalOpen,
        handleSetOpen,
    }
}
