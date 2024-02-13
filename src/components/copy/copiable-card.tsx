import { ClipboardIcon, ThumbsUpIcon } from 'lucide-react'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

interface CopiableTextProps {
    children: React.ReactNode
    copyText: string
    className?: string
    hoveringChild?: boolean
}

export default function CopiableCard({ children, className, copyText, hoveringChild }: CopiableTextProps) {
    const [isCopied, setIsCopied] = useState(false)

    function copyToClipboard() {
        if (hoveringChild) return
        navigator.clipboard.writeText(copyText)
        setIsCopied(true)
        toast.success(`"${copyText}" copied to clipboard!`)
    }

    return (
        <div
            className={twMerge(
                'group/card relative flex cursor-pointer flex-col rounded-lg border px-4 py-2 transition',
                hoveringChild
                    ? null
                    : isCopied
                      ? 'hover:border-green-500'
                      : 'hover:border-dashed hover:border-fastapp-500',
                className
            )}
            onClick={copyToClipboard}
            onMouseLeave={() =>
                setTimeout(() => {
                    setIsCopied(false)
                }, 500)
            }
        >
            {children}

            <div
                className={twMerge(
                    `absolute bottom-0 top-0 z-20 mt-[4px] text-transparent transition`,
                    hoveringChild
                        ? null
                        : isCopied
                          ? 'group-hover/card:text-green-500'
                          : 'group-hover/card:text-fastapp-500'
                )}
                style={{
                    left: 'calc(100% + 15px)',
                }}
            >
                {!isCopied ? (
                    <ClipboardIcon
                        size={15}
                        className="transition group-active/card:rotate-[20deg]"
                    />
                ) : (
                    <ThumbsUpIcon
                        size={15}
                        className="transition group-active/card:rotate-[20deg]"
                    />
                )}
            </div>
        </div>
    )
}
