import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../redux/reducers/usersReducer"

export default function Users() {
  const users = useSelector((state) => state.users.usersData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch])

  if (!users) return <p>loading...</p>

  return (
    <div>
      <h2>Users</h2>
      {users && <table>
        <thead>
          <tr>
            <th>Names</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
        {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </div>


  )
}
