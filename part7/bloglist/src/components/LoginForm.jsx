import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../redux/reducers/userReducer'
import { Button, TextField, Paper } from '@mui/material'


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
        <Paper elevation={3} sx={{ padding: '50px 100px'}}>
            <form onSubmit={handleLogin} id="login-form">
                <TextField label="Username" value={username} onChange={({ target }) => setUsername(target.value)} size='small' margin='normal' fullWidth required/>

                <TextField label="Password" value={password} onChange={({ target }) => setPassword(target.value)} size='small' margin='normal' fullWidth required sx={{ marginBottom: '50px' }}/>

                <Button variant='contained' color='primary' type='submit' disableElevation>Login</Button>
            </form>
        </Paper>
    )
}

