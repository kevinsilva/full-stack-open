import { Typography, Container } from "@mui/material"


export default function Title({ user }) {
  return (
    <Container>
      <Typography variant='h4' component='h1' sx={{ textAlign: 'center', marginTop: '100px' }}>
        {user ? 'blog app' : 'log in to application'}
      </Typography>
    </Container>
  )
}
