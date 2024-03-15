import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
import { Toolbar, AppBar, Typography } from '@mui/material';

export default function Navigation({ user }) {
  return (
    <AppBar color='default' className='appBar'>
      <Toolbar>
          <Link to="/" className='appbar-link'><Typography color='textPrimary'>blogs</Typography></Link>
          <Link to="/users" className='appbar-link'><Typography color='textPrimary'>users</Typography></Link>
          {user && <LogoutButton user={user} />}
      </Toolbar>
    </AppBar>
  )
}
