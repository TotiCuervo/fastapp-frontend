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

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Portfolio must be at least 2 characters.',
    }),
})

interface PortfolioFormProps {
    onSuccessfullSubmit?: () => void
}

export default function PortfolioForm({ onSuccessfullSubmit }: PortfolioFormProps) {
    const router = useRouter()

    const [alert, setAlert] = useState<Alert>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: 'My Portfolio',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await createPortfolio({
                ...values,
            })

            if (res.status !== 201) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit()
            router.push(portfolioIdRoute(res.data.id))
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
            <Alerter alert={alert} />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Portfolio</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        loading={form.formState.isSubmitting}
                        loadingText="Submitting..."
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </>
    )
}
