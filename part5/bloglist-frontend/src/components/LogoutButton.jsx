export default function LogoutButton({ user, onLogout }) {

  const handleLogout = () => {
    onLogout()
    window.localStorage.removeItem('loggedUser')
  }

  return (
    <>
      {user && <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>}
    </>
  )
}
