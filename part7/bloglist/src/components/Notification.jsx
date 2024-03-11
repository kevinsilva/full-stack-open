import React from 'react'
import { useSelector } from 'react-redux'

export default function Notification() {
    const { text, class: type } = useSelector((state) => state.notification)

    if (text === null) return null

    return <div className={type === 'error' ? 'error' : 'success'}>{text}</div>
}
