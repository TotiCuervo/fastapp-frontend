import { Alert } from '@/lib/types/alert'
import React from 'react'
import { ErrorAlert } from './error-alert'

interface IProps {
    alert: Alert | undefined
}

export default function Alerter({ alert }: IProps) {
    if (!alert) return null

    function render() {
        if (!alert) return null
        switch (alert.type) {
            case 'danger':
                return <ErrorAlert message={alert.message} />
            default:
                return null
        }
    }

    return render()
}
