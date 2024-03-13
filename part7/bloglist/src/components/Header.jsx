import { useSelector } from "react-redux"
import Title from "./Title"
import Notification from "./Notification"
import Navigation from "./Navigation"

export default function Header() {
  const user = useSelector((state) => state.user.userData)
  return (
    <div>
      <Navigation user={user}/>
      <Title user={user}/>
      <Notification />
    </div>
  )
}
