import { useState } from 'react'
import loginService from '../services/login'
import { setToken } from '../services/blogs'
import PropTypes from 'prop-types'
export default function LoginForm({ onUserChange, onMessage }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      onUserChange(user)
      setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch(exception) {
      onMessage({
        text: 'wrong username or password',
        class: 'error'
      })
      setTimeout(() => onMessage({
        text: null,
        class: null
      }), 5000)
    }
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="Username">Username</label>
          <input type="text" value={username} name='Username' onChange={({ target }) => setUsername(target.value)} required/>
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input type="password" value={password} name='Password' onChange={({ target }) => setPassword(target.value)} required/>
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  onUserChange: PropTypes.func.isRequired,
}