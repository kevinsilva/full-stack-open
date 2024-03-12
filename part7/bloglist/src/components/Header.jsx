import Title from "./Title"
import Notification from "./Notification"
import { useSelector } from "react-redux"
import LogoutButton from "./LogoutButton"

export default function Header() {
  const user = useSelector((state) => state.user.userData)
  return (
    <div>
      <Title user={user}/>
      <Notification />
      {user && <LogoutButton user={user} />}
    </div>
  )
}
