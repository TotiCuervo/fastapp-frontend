import React from 'react'
import Combobox, { ComboBoxOptions, ComboBoxProps } from './combobox'

interface DegreeTypeComboboxProps extends Omit<ComboBoxProps, 'options'> {}

const options: ComboBoxOptions = [
    {
        label: "Associate's",
        value: "Associate's",
    },
    {
        label: "Bachelor's",
        value: "Bachelor's",
    },
    {
        label: "Master's",
        value: "Master's",
    },
    {
        label: 'PhD',
        value: 'PhD',
    },
    {
        label: 'MBA',
        value: 'MBA',
    },
    {
        label: 'PharMD',
        value: 'PharMD',
    },
    {
        label: 'JD',
        value: 'JD',
    },
    {
        label: 'MD',
        value: 'MD',
    },
    {
        label: 'Bootcamp',
        value: 'Bootcamp',
    },
    {
        label: 'Certification',
        value: 'Certification',
    },
]

export default function DegreeTypeCombobox({ ...props }: DegreeTypeComboboxProps) {
    return (
        <Combobox
            {...props}
            options={options}
        />
    )
}
