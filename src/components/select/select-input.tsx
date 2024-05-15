import * as React from 'react'

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface SelectOption {
    label?: string
    items: string[]
}

export interface SelectInputProps {
    options: SelectOption[]
    value: string | undefined
    onChange: (value: string) => void
    placeholder?: string
    disabled?: boolean
}

export default function SelectInput({ options, value, onChange, placeholder, disabled }: SelectInputProps) {
    return (
        <Select
            value={value}
            onValueChange={onChange}
            disabled={disabled}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, index) => (
                    <SelectGroup key={index}>
                        {option.label && <SelectLabel>{option.label}</SelectLabel>}
                        {option.items.map((item, index) => (
                            <SelectItem
                                key={index}
                                value={item}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ))}
            </SelectContent>
        </Select>
    )
}
