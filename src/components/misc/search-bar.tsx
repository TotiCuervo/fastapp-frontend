import { Search } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'

interface IProps {
    value: string
    onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: IProps) {
    return (
        <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
                placeholder="Search"
                className="w-full pl-8"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
