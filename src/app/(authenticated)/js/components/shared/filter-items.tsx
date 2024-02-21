'use client'
import React, { useEffect } from 'react'
import Link from 'next/link'
import FilterButton, { FilterButtonItem } from '@/components/buttons/filter-button'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useRouter } from 'next/navigation'

export interface FilterItem extends FilterButtonItem {
    route: string
}
interface FilterItemsProps {
    items: FilterItem[]
    active: (item: FilterItem) => boolean
}

export default function FilterItems({ items, active }: FilterItemsProps) {
    const [selected, setSelected] = React.useState('')
    const router = useRouter()

    function onSelectChange(label: string) {
        const item = items.find((item) => item.label === label)
        if (!item) return
        setSelected(item.label)
        router.push(item.route)
    }

    return (
        <>
            <div className="hidden w-full flex-row gap-2 sm:flex md:flex-col">
                {items.map((item, index) => (
                    <Link
                        href={item.route}
                        key={`${index} ${item.label}`}
                    >
                        <FilterButton
                            Icon={item.Icon}
                            label={item.label}
                            active={active(item)}
                        />
                    </Link>
                ))}
            </div>
            <div className="w-full sm:hidden">
                <Select
                    value={selected}
                    onValueChange={onSelectChange}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Items" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {items.map((item, index) => (
                                <SelectItem
                                    key={`${index} ${item.label}`}
                                    value={item.label}
                                >
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </>
    )
}
