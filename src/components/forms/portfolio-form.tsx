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
import portfolioIdRoute from '@/app/(authenticated)/js/portfolio/[id]/_route'
import Portfolio from '@/lib/types/portfolio/portfolio'
import UpdatePortfolio from '@/lib/endpoints/portfolio/update-portfolio'
import { useUserContext } from '@/context/UserContext'
import { Checkbox } from '../ui/checkbox'

const formSchema = z.object({
    name: z.string().min(2, {
        message: 'Portfolio must be at least 2 characters.'
    }),
    description: z
        .string()
        .min(2, {
            message: 'Description must be at least 2 characters.'
        })
        .optional(),
    email: z.string().email({
        message: 'Please enter a valid email address.'
    }),
    phone: z
        .string()
        .refine((value) => value === undefined || value.trim().length === 0 || value.trim().length >= 10, {
            message: 'Please enter a valid phone number.'
        })
        .optional()
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
    const { user } = useUserContext()
    const [alert, setAlert] = useState<Alert>()
    const [useProfileInfo, setUseProfileInfo] = useState(true)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: portfolio?.name || 'My Portfolio',
            description: portfolio?.description || undefined,
            email: portfolio ? portfolio.email : user!.email,
            phone: portfolio && portfolio.phone
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
        } catch (e) {
            console.log(e)
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
                experience: portfolio!.experience.map((exp) => exp.id),
                education: portfolio!.education.map((edu) => edu.id),
                skills: portfolio!.skills.map((skill) => skill.id),
                ...values
            })

            if (res.status !== 200) {
                throw new Error('Something went wrong')
                return
            }
            onSuccessfullSubmit && onSuccessfullSubmit(res.data.data)
            router.push(portfolioIdRoute({ id: res.data.data.id }))
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    {(portfolio !== undefined || !useProfileInfo) && (
                        <>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )}
                    {!portfolio && (
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="terms"
                                checked={useProfileInfo}
                                onCheckedChange={(e: boolean) => setUseProfileInfo(e)}
                            />
                            <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Use account email and phone
                            </label>
                        </div>
                    )}
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
