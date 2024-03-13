import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../redux/reducers/usersReducer"
import { Link } from "react-router-dom"

export default function Users() {
  const users = useSelector((state) => state.users.usersData)
  const dispatch = useDispatch()


  useEffect(() => {
    if (!users) dispatch(getAllUsers());
  }, [dispatch, users])

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
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
      }
    </div>


  )
}
