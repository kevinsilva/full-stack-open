import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../redux/reducers/userReducer"

export default function LogoutButton() {
  const user = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      {user && <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>}
    </>
  )
}
