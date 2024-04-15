const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) return null

  return (
    <div style={{color: 'red', marginBottom: '25px'}}>
      {errorMessage}
    </div>
  )
}

export default Notify