import { ClipboardIcon, ThumbsUpIcon } from 'lucide-react'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

interface CopiableTextProps {
    children: string
    className?: string
    hovering?(hovering: boolean): void
}

export default function CT({ children, className, hovering }: CopiableTextProps) {
    const [isCopied, setIsCopied] = useState(false)

    function copyToClipboard() {
        navigator.clipboard.writeText(children)
        setIsCopied(true)
        toast.success(`"${children}" copied to clipboard!`)
    }

    return (
        <div>
            <div
                className={`${className} group/text relative inline-block`}
                onClick={copyToClipboard}
                onMouseEnter={() => hovering && hovering(true)}
                onMouseLeave={() => {
                    hovering && hovering(false)
                    setTimeout(() => {
                        setIsCopied(false)
                    }, 500)
                }}
            >
                {children}
                <div
                    className={twMerge(
                        `w-[calc(100% + 5px)] absolute left-0 top-0 z-10 -ml-[10px] -mt-[1.25px] flex items-center justify-center rounded-lg border-2 border-transparent transition`,
                        isCopied
                            ? `group-hover/text:border-green-500`
                            : `border-dashed group-hover/text:border-fastapp-500`
                    )}
                    style={{
                        width: 'calc(100% + 20px)',
                        height: 'calc(100% + 2.5px)',
                    }}
                />
                <div
                    className={twMerge(
                        `absolute bottom-0 top-0 z-20 mt-[4px] text-transparent transition`,
                        isCopied ? `group-hover/text:text-green-500` : `group-hover/text:text-fastapp-500`
                    )}
                    style={{
                        left: 'calc(100% + 15px)',
                    }}
                >
                    {!isCopied ? (
                        <ClipboardIcon
                            size={15}
                            className="transition group-active/text:rotate-[20deg]"
                        />
                    ) : (
                        <ThumbsUpIcon
                            size={15}
                            className="transition group-active/text:rotate-[20deg]"
                        />
                    )}
                </div>
            </div>
        </div>
    )
}
