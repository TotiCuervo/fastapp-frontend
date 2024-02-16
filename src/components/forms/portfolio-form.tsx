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
import portfolioIdRoute from '@/app/(auth)/js/portfolio/[id]/_route'
import Portfolio from '@/lib/types/portfolio/portfolio'
import UpdatePortfolio from '@/lib/endpoints/portfolio/update-portfolio'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Portfolio must be at least 2 characters.'
    })
})

interface PortfolioFormProps {
    onSuccessfullSubmit?: (portfolio: Portfolio) => void
    Cancel?: React.ReactNode
    portfolio?: Portfolio
    saveButtonText?: string
}

export default function PortfolioForm({
    onSuccessfullSubmit,
    Cancel,
    portfolio,
    saveButtonText = 'Submit'
}: PortfolioFormProps) {
    const router = useRouter()

    const [alert, setAlert] = useState<Alert>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: portfolio?.name || 'My Portfolio'
        }
    })

    const onSubmit = portfolio ? updateSubmit : createSubmit

    async function createSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await createPortfolio({
                ...values
            })

            if (res.status !== 201) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit(res.data.data)
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
            const res = await UpdatePortfolio({
                ...portfolio!,
                ...values
            })

            if (res.status !== 200) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit(res.data.data)
            router.push(portfolioIdRoute(res.data.data.id))
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
                    <div className="flex justify-end gap-4">
                        {Cancel && Cancel}
                        <Button type="submit" loading={form.formState.isSubmitting} loadingText="Submitting...">
                            {saveButtonText}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
