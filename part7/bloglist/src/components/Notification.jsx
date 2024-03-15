import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

export default function Notification() {
    const { text, class: type } = useSelector((state) => state.notification)

    if (text === null) return null

    return <Alert severity={type === 'error' ? 'error' : 'success'} sx={{ margin: '20px' }}>{text}</Alert>
}
