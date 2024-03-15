import { useDispatch, useSelector } from "react-redux"
import { logoutUser } from "../redux/reducers/userReducer"
import { Typography, Button } from "@mui/material"

export default function LogoutButton() {
  const user = useSelector((state) => state.user.userData)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <>
      {user && <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
        <Typography sx={{ marginRight: '10px' }}>{user.name} logged in</Typography>
        <Button variant='text' onClick={handleLogout}>logout</Button>
        </div>}
    </>
  )
}
