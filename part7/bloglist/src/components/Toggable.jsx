import { useImperativeHandle, forwardRef, useState } from 'react'
import { Button } from '@mui/material'
import PropTypes from 'prop-types'

export const Toggable = forwardRef((props, ref) => {
  const { children, buttonLabel = 'show' } = props
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ display: visible && 'none' }}>
        <Button variant='contained' color='primary' onClick={toggleVisibility} disableElevation>{buttonLabel}</Button>
      </div>
      <div style={{ display: !visible && 'none' }}>
        {children}
        <Button variant='text' color='primary' onClick={toggleVisibility} disableElevation sx={{ position: 'relative', left: '10px', bottom: '40px' }}>Cancel</Button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}