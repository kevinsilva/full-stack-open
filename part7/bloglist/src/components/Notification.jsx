import React from 'react'

export default function Notification({ message }) {
  if (message.text === null) return null

  return (
    <div className={message.class === 'error' ? 'error' : 'success'}>
      {message.text}
    </div>
  )
}
