import Image from 'next/image'
import React from 'react'

interface LogoImageProps {
    size: number
}

export default function LogoImage({ size }: LogoImageProps) {
    return (
        <Image
            src="/logo.png"
            alt="Fastapp logo"
            width={size}
            height={size}
        />
    )
}
