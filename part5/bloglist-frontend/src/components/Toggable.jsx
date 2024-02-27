import { useImperativeHandle, forwardRef, useState } from 'react'
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
    <div>
      <div style={{ display: visible && 'none' }}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={{ display: !visible && 'none' }}>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Toggable.displayName = 'Toggable'

Toggable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}