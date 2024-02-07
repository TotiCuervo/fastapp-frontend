'use client'
import React from 'react'

interface IProps {
    title: string
    content: string
}

export default function DetailCard({ title, content }: IProps) {
    return (
        <div className="flex cursor-pointer flex-col gap-2 rounded-lg border px-4 py-2 shadow-sm transition">
            <span className="font-semibold">{title}</span>
            <p>{content}</p>
        </div>
    )
}
