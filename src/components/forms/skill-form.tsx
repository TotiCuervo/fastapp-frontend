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
import { useUserContext } from '@/context/UserContext'
import convertMonthTextToInt from '@/lib/method/convert-month-text-to-int'
import Portfolio from '@/lib/types/portfolio/portfolio'
import capitalize from '@/lib/method/capitalize'
import Education from '@/lib/types/education/education'
import updateUserEducation from '@/lib/endpoints/education/update-user-education'
import createUserSkill from '@/lib/endpoints/skill/create-user-skill'
import useSkillsQuery from '@/lib/query/skills/useSkillsQuery'
import Combobox, { ComboBoxOptions } from '../combobox/combobox'

const formSchema = z.object({
    skillSets: z.string().min(1, {
        message: 'Skill must be at least 1 character.'
    })
})

interface FormProps {
    onSuccessfullSubmit?: () => void
    Cancel?: React.ReactNode
    portfolioId?: Portfolio['id']
    education?: Education
}

export default function SkillForm({ onSuccessfullSubmit, Cancel, portfolioId, education }: FormProps) {
    const { user } = useUserContext()

    const { data: skills = [] } = useSkillsQuery()
    const options: ComboBoxOptions = skills.map((skill) => {
        return {
            value: skill.id.toString(),
            label: skill.skillSet
        }
    })

    const [alert, setAlert] = useState<Alert>()

    const submitFunction = education ? updateSubmit : createSubmit

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
        // defaultValues: {
        //     school: education?.school || '',
        //     degree: education?.degree || '',
        //     fieldOfStudy: education?.fieldOfStudy || '',
        //     startMonth: education?.startedOn.monthName.full || '',
        //     startYear: education?.startedOn.year.toString() || '',
        //     endMonth: education?.endedOn.monthName.full || '',
        //     endYear: education?.endedOn.year.toString() || '',
        // },
    })

    async function createSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log({ values })
            const res = await createUserSkill({
                userId: user!.id,
                skillSets: [values.skillSets]
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
                message: 'Looks like something went wrong. Please try again.'
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
                portfolios: portfolioId ? [portfolioId] : undefined
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
                message: 'Looks like something went wrong. Please try again.'
            })
        }
    }

    return (
        <>
            <Alerter alert={alert} className="mt-4" />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submitFunction)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="skillSets"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skill</FormLabel>
                                <FormControl>
                                    <Combobox {...field} options={options} />
                                </FormControl>
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
