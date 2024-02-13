import React from 'react'
import SelectInput, { SelectInputProps } from './select-input'

interface YearSelectProps extends Omit<SelectInputProps, 'options'> {}

export default function YearSelect({ ...props }: YearSelectProps) {
    const currentYear = new Date().getFullYear()
    const last100Years = Array.from({ length: 100 }, (_, index) => (currentYear - index).toString())

    return (
        <SelectInput
            {...props}
            options={[
                {
                    items: last100Years,
                },
            ]}
        />
    )
}
