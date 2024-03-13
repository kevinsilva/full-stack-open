import { Link } from 'react-router-dom'
import LogoutButton from './LogoutButton'
export default function Navigation({ user }) {
  return (
    <nav>
      <Link to="/">blogs</Link>
      <Link to="/users">users</Link>
      {user && <LogoutButton user={user} />}
    </nav>
  )
}
