import React from 'react'
import SelectInput, { SelectInputProps } from './select-input'

interface MonthSelectProps extends Omit<SelectInputProps, 'options'> {}

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export default function MonthSelect({ ...props }: MonthSelectProps) {
    return (
        <SelectInput
            {...props}
            options={[
                {
                    items: months,
                },
            ]}
        />
    )
}
