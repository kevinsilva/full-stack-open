import { useState } from 'react'
import loginService from '../services/login'
import { setToken } from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotification } from '../redux/reducers/notificationReducer'

export default function LoginForm({ onUserChange }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            onUserChange(user)
            setToken(user.token)
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            setUsername('')
            setPassword('')
        } catch (exception) {
            dispatch(
                setNotification({
                    text: 'wrong username or password',
                    class: 'error',
                })
            )
        }
    }

    return (
        <>
            <form onSubmit={handleLogin} id="login-form">
                <div>
                    <label htmlFor="Username">Username</label>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                        id="username"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="Password">Password</label>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                        id="password"
                        required
                    />
                </div>
                <button type="submit" id="login-button">
                    Login
                </button>
            </form>
        </>
    )
}

LoginForm.propTypes = {
    onUserChange: PropTypes.func.isRequired,
}
