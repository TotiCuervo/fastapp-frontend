'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface InputProps {
    value: string | undefined
    onChange: (date?: string) => void
}

export function DateInput({ value, onChange }: InputProps) {
    const date = value ? new Date(value) : undefined

    if (date) {
        date.setDate(date.getDate() + 1)
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn('w-full justify-start text-left font-normal', !date && 'text-muted-foreground')}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => onChange(date ? format(date, 'yyyy-MM-dd') : undefined)}
                />
            </PopoverContent>
        </Popover>
    )
}
