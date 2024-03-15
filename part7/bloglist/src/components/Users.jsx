import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers } from "../redux/reducers/usersReducer"
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"


export default function Users() {
  const users = useSelector((state) => state.users.usersData)
  const dispatch = useDispatch()


  useEffect(() => {
    if (!users) dispatch(getAllUsers());
  }, [dispatch, users])

  if (!users) return <p>loading...</p>


  return (
    <TableContainer>
      <Typography variant="h5">Users</Typography>
      {users && <Table sx={{ maxWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Names</TableCell>
            <TableCell>Blogs Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
              <TableCell>{user.blogs.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      }
    </TableContainer>


  )
}
