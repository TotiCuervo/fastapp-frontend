import React from 'react'
import SelectInput, { SelectInputProps } from './select-input'
import ExperienceType from '@/lib/types/experience/experience-type'

interface SelectProps extends Omit<SelectInputProps, 'options'> {}

const experienceTypes: ExperienceType[] = [
    'Full-Time',
    'Part-Time',
    'Contract',
    'Internship',
    'Freelance',
    'Apprenticeship',
]
export default function ExpereinceTypeSelect({ ...props }: SelectProps) {
    return (
        <SelectInput
            {...props}
            options={[
                {
                    items: experienceTypes,
                },
            ]}
        />
    )
}
