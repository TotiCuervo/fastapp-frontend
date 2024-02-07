'use client'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import createPortfolio from '@/lib/endpoints/portfolio/create-portfolio'
import Button from '@/components/buttons/button'
import { useState } from 'react'
import { Alert } from '@/lib/types/alert'
import Alerter from '@/components/alerts/alerter'
import { useRouter } from 'next/navigation'
import portfolioIdRoute from '@/app/(auth)/js/(sidebar)/portfolio/[id]/_route'
import { Combobox } from '../combobox/combobox'

const formSchema = z.object({
    school_name: z.string().min(2, {
        message: 'School Name must be at least 2 characters.'
    }),
    degree: z.string().min(2, {
        message: 'Degree must be at least 2 characters.'
    }),
    field_of_study: z.string().min(2, {
        message: 'Field of Study must be at least 2 characters.'
    }),
    start_date: z.date(),
    end_date: z.date()
})

interface PortfolioFormProps {
    onSuccessfullSubmit?: () => void
}

export default function AddEducationForm({ onSuccessfullSubmit }: PortfolioFormProps) {
    const router = useRouter()

    const [alert, setAlert] = useState<Alert>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // const res = await createPortfolio({
            //     ...values
            // })

            // if (res.status !== 201) {
            //     throw new Error('Something went wrong')
            //     return
            // }
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
            <Alerter alert={alert} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="school_name"
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
                    <FormField
                        control={form.control}
                        name="degree"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                    {/* <Input {...field} /> */}
                                    <Combobox />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" loading={form.formState.isSubmitting} loadingText="Submitting...">
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    )
}
