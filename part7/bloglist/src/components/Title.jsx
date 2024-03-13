import React from 'react'

export default function Title({ user }) {
  return (
    <h1>{user ? 'blog app' : 'log in to application'}</h1>
  )
}
