import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/reducers/userReducer'

export default function LoginForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const handleLogin = (event) => {
        event.preventDefault()

        dispatch(loginUser({ username, password }))
        setUsername('')
        setPassword('')
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

