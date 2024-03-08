import { useEffect } from 'react'

export default function Notification({ text, clearText }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clearText()
    }, 5000)

    return () => clearTimeout(timer)
  }, [clearText])

  return <div>{text}</div>
}
