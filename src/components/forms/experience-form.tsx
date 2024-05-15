'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/components/buttons/button'
import React, { useEffect, useState } from 'react'
import { Alert } from '@/lib/types/alert'
import Alerter from '@/components/alerts/alerter'
import MonthSelect from '../select/month-select'
import YearSelect from '../select/year-select'
import { useUserContext } from '@/context/UserContext'
import convertMonthTextToInt from '@/lib/method/convert-month-text-to-int'
import { Textarea } from '../ui/textarea'
import ExpereinceTypeSelect from '../select/experience-type-select'
import { Checkbox } from '../ui/checkbox'
import createUserExperience from '@/lib/endpoints/experience/create-user-experience'
import ExperienceInsert from '@/lib/types/experience/experience-insert'
import ExperienceType from '@/lib/types/experience/experience-type'
import Portfolio from '@/lib/types/portfolio/portfolio'
import Experience from '@/lib/types/experience/experience'
import ExperienceUpdate from '@/lib/types/experience/experience-update'
import editUserExperience from '@/lib/endpoints/experience/edit-user-experience'

const formSchema = z.object({
    position: z.string().min(2).max(255),
    company: z.string().min(2).max(255),
    location: z.string().min(2).max(255),
    experienceType: z.string().min(2).max(255),
    startMonth: z.string().min(2).max(255),
    startYear: z.string().min(4).max(4),
    description: z.string().optional().nullable(),
    isCurrent: z.boolean().default(false)
})

const conditionalFormSchema = (currentlyWorkHere: boolean) =>
    currentlyWorkHere
        ? // @ts-ignore
          formSchema.omit({ endMonth: true, endYear: true })
        : formSchema.extend({
              endMonth: z.string().min(2).max(255),
              endYear: z.string().min(4).max(4)
          })

interface FormProps {
    onSuccessfullSubmit?: () => void
    Cancel?: React.ReactNode
    experience?: Experience
    portfolioId?: Portfolio['id']
}

export default function ExperienceForm({ onSuccessfullSubmit, Cancel, experience, portfolioId }: FormProps) {
    const { user } = useUserContext()
    const [alert, setAlert] = useState<Alert>()
    const [currentlyWorkHere, setCurrentlyWorkHere] = useState(false)
    const submitFunction = experience ? onSubmitEdit : onSubmitCreate

    const form = useForm({
        resolver: zodResolver(conditionalFormSchema(currentlyWorkHere)),
        defaultValues: {
            position: experience?.position ?? '',
            company: experience?.company.companyName ?? '',
            location: experience?.location ?? '',
            experienceType: experience?.experienceType ?? '',
            startMonth: experience?.startedOn.monthName.full ?? '',
            startYear: experience?.startedOn.year.toString() ?? '',
            endMonth: experience?.endedOn?.monthName?.full ?? null,
            endYear: experience?.endedOn?.year?.toString() ?? null,
            description: experience?.description ?? '',
            isCurrent: experience?.endedOn?.month === null && experience?.endedOn?.year === null
        }
    })

    const { control, handleSubmit, watch, setValue } = form
    const watchCurrentlyWorkHere = watch('isCurrent', false)

    useEffect(() => {
        // Update the validation schema when the checkbox state changes
        formResolver: zodResolver(conditionalFormSchema(watchCurrentlyWorkHere))
        if (watchCurrentlyWorkHere) {
            // If the checkbox is checked, clear the values
            setValue('endMonth', null)
            setValue('endYear', null)
        }
    }, [watchCurrentlyWorkHere, setValue])

    async function onSubmitCreate(values: z.infer<typeof formSchema>) {
        try {
            const startMonthInt = convertMonthTextToInt(values.startMonth)
            const apiData: ExperienceInsert = {
                userId: user!.id,
                ...values,
                startMonth: startMonthInt,
                startYear: parseInt(values.startYear),
                experienceType: values.experienceType as ExperienceType,
                portfolios: portfolioId ? [portfolioId] : [],
                description: values.description ?? undefined
            }
            // @ts-ignore
            if (values.endMonth) {
                // @ts-ignore
                apiData.endMonth = convertMonthTextToInt(values.endMonth)
            }
            // @ts-ignore
            if (values.endYear) {
                // @ts-ignore
                apiData.endYear = parseInt(values.endYear)
            }

            const res = await createUserExperience(apiData)
            if (res.status !== 201) {
                throw new Error('Something went wrong')
            }
            onSuccessfullSubmit && onSuccessfullSubmit()
        } catch (error) {
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.'
            })
        }
    }

    async function onSubmitEdit(values: z.infer<typeof formSchema>) {
        try {
            const startMonthInt = convertMonthTextToInt(values.startMonth)

            const apiData: ExperienceUpdate = {
                userId: user!.id,
                id: experience!.id,
                ...values,
                startMonth: startMonthInt,
                startYear: parseInt(values.startYear),
                experienceType: values.experienceType as ExperienceType,
                portfolios: portfolioId ? [portfolioId] : [],
                description: values.description ?? undefined
            }

            // @ts-ignore
            if (!values.isCurrent && values.endMonth) {
                // @ts-ignore
                apiData.endMonth = convertMonthTextToInt(values.endMonth)
            }
            // @ts-ignore
            if (!values.isCurrent && values.endYear) {
                // @ts-ignore
                apiData.endYear = parseInt(values.endYear)
            }

            if (values.isCurrent) {
                // @ts-ignore
                apiData.endMonth = null
                // @ts-ignore
                apiData.endYear = null
            }

            // API call to create user education
            const res = await editUserExperience(apiData)

            if (res.status !== 200) {
                throw new Error('Something went wrong')
            }

            onSuccessfullSubmit && onSuccessfullSubmit()
        } catch (error) {
            console.log({ error })
            setAlert({
                show: true,
                type: 'danger',
                message: 'Looks like something went wrong. Please try again.'
            })
        }
    }

    return (
        <>
            <Alerter alert={alert} className="mb-4" />
            <Form {...form}>
                <form
                    // @ts-ignore
                    onSubmit={handleSubmit(submitFunction)}
                    className="space-y-4"
                >
                    <div className="flex gap-4">
                        <FormField
                            control={control}
                            name="position"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Position</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="company"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Company</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex gap-4">
                        <FormField
                            control={control}
                            name="experienceType"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Experience Type</FormLabel>
                                    <FormControl>
                                        <ExpereinceTypeSelect {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="location"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <div className="flex w-full gap-4">
                            <FormField
                                control={control}
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
                                control={control}
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
                                control={control}
                                name="endMonth"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>End Month</FormLabel>
                                        <FormControl>
                                            <MonthSelect
                                                {...field}
                                                value={field.value ?? undefined}
                                                disabled={currentlyWorkHere}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={control}
                                name="endYear"
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>End Year</FormLabel>
                                        <FormControl>
                                            <YearSelect
                                                {...field}
                                                value={field.value ?? undefined}
                                                disabled={currentlyWorkHere}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={control}
                        name="isCurrent"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                    {/* @ts-ignore */}
                                    <Checkbox
                                        {...field}
                                        checked={field.value}
                                        onCheckedChange={(checked: boolean) => {
                                            field.onChange(checked)
                                            setCurrentlyWorkHere(checked)
                                        }}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>I currently work here</FormLabel>
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormDescription>A brief description of your experience</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end gap-2">
                        {Cancel && Cancel}
                        <Button type="submit" loading={form.formState.isSubmitting} loadingText="Submitting...">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
