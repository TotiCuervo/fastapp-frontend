'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/buttons/button'
import React, { useState } from 'react'
import { Alert } from '@/lib/types/alert'
import Alerter from '@/components/alerts/alerter'
import DegreeTypeCombobox from '../combobox/degree-type-combobox'
import MonthSelect from '../select/month-select'
import YearSelect from '../select/year-select'
import createUserEducation from '@/lib/endpoints/education/create-user-education'
import { useUserContext } from '@/context/UserContext'
import convertMonthTextToInt from '@/lib/method/convert-month-text-to-int'
import Portfolio from '@/lib/types/portfolio/portfolio'
import capitalize from '@/lib/method/capitalize'
import Education from '@/lib/types/education/education'
import updateUserEducation from '@/lib/endpoints/education/update-user-education'

const formSchema = z.object({
    school: z.string().min(2, {
        message: 'School Name must be at least 2 characters.',
    }),
    degree: z.string().min(2, {
        message: 'Degree must be at least 2 characters.',
    }),
    fieldOfStudy: z.string().min(2, {
        message: 'Field of Study must be at least 2 characters.',
    }),
    startMonth: z.string(),
    startYear: z.string(),
    endMonth: z.string(),
    endYear: z.string(),
})

interface FormProps {
    onSuccessfullSubmit?: () => void
    Cancel?: React.ReactNode
    portfolioId?: Portfolio['id']
    education?: Education
}

export default function AddEducationForm({ onSuccessfullSubmit, Cancel, portfolioId, education }: FormProps) {
    const { user } = useUserContext()

    const [alert, setAlert] = useState<Alert>()

    const submitFunction = education ? updateSubmit : createSubmit

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            school: education?.school || '',
            degree: education?.degree || '',
            fieldOfStudy: education?.fieldOfStudy || '',
            startMonth: education?.startedOn.monthName.full || '',
            startYear: education?.startedOn.year.toString() || '',
            endMonth: education?.endedOn.monthName.full || '',
            endYear: education?.endedOn.year.toString() || '',
        },
    })

    async function createSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await createUserEducation({
                userId: user!.id,
                ...values,
                degree: capitalize(values.degree),
                startMonth: convertMonthTextToInt(values.startMonth),
                endMonth: convertMonthTextToInt(values.endMonth),
                startYear: parseInt(values.startYear),
                endYear: parseInt(values.endYear),
                portfolios: portfolioId ? [portfolioId] : undefined,
            })

            if (res.status !== 201) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit()
        } catch {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.',
            })
        }
    }

    async function updateSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await updateUserEducation({
                id: education!.id,
                userId: user!.id,
                ...values,
                degree: capitalize(values.degree),
                startMonth: convertMonthTextToInt(values.startMonth),
                endMonth: convertMonthTextToInt(values.endMonth),
                startYear: parseInt(values.startYear),
                endYear: parseInt(values.endYear),
                portfolios: portfolioId ? [portfolioId] : undefined,
            })

            if (res.status !== 200) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit()
        } catch {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.',
            })
        }
    }

    return (
        <>
            <Alerter
                alert={alert}
                className="mt-4"
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitFunction)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="school"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <FormField
                            control={form.control}
                            name="fieldOfStudy"
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-4/6">
                                    <FormLabel>Field of Study (Major)</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="degree"
                            render={({ field }) => (
                                <FormItem className="w-full sm:w-2/6">
                                    <FormLabel>Degree</FormLabel>
                                    <FormControl>
                                        <DegreeTypeCombobox {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex w-full gap-4">
                            <FormField
                                control={form.control}
                                name="startMonth"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Start Month</FormLabel>
                                        <FormControl>
                                            <MonthSelect {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="startYear"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Start Year</FormLabel>
                                        <FormControl>
                                            <YearSelect {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex w-full gap-4">
                            <FormField
                                control={form.control}
                                name="endMonth"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>End Month</FormLabel>
                                        <FormControl>
                                            <MonthSelect {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="endYear"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>End Year</FormLabel>
                                        <FormControl>
                                            <YearSelect {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-2">
                        {Cancel && Cancel}
                        <Button
                            type="submit"
                            loading={form.formState.isSubmitting}
                            loadingText="Submitting..."
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
