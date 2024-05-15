'use client'
import Alerter from '@/components/alerts/alerter'
import Button from '@/components/buttons/button'
import { DateInput } from '@/components/input/date-input'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useUserContext } from '@/context/UserContext'
import updateUser from '@/lib/endpoints/auth/update-user'
import { Alert } from '@/lib/types/alert'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
    dob: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    phoneNumber: z.string().optional()
})

export default function ProfileEditForm() {
    const { user, refreshUser } = useUserContext()

    const [alert, setAlert] = useState<Alert>()

    const form = useForm({
        defaultValues: {
            dob: user?.dob,
            firstName: user?.firstName,
            lastName: user?.lastName,
            phoneNumber: user?.phoneNumbers[0]?.phoneNumber
        },
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        if (user) {
            form.reset({
                dob: user.dob,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user?.phoneNumbers[0]?.phoneNumber
            })
        }
    }, [user])

    const { control, handleSubmit } = form

    function submitFunction(data: any) {
        if (!user) {
            return
        }

        const { phoneNumber, ...rest } = data
        let apiData = {
            id: user.id,
            ...rest
        }

        if (phoneNumber) {
            apiData = {
                ...apiData,
                phoneNumber
            }
        }
        try {
            updateUser(apiData)
            refreshUser()
        } catch (error) {
            setAlert({
                message: 'An error occurred while updating your profile',
                type: 'danger',
                show: true
            })
        }
    }

    return (
        <>
            <Alerter alert={alert} />
            <Form {...form}>
                <form onSubmit={handleSubmit(submitFunction)} className="space-y-4">
                    <div className="space-y-4">
                        <FormField
                            control={control}
                            name="firstName"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="lastName"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="dob"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Date of Birth</FormLabel>
                                    <FormControl>
                                        <DateInput {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem className="w-1/2">
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" loading={form.formState.isSubmitting} loadingText="Submitting...">
                            Save
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    )
}
