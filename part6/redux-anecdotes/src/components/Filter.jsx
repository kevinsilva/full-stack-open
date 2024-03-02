import { useDispatch } from 'react-redux'
const Filter = () => {
  const dispatch = useDispatch()

  return (
    <div style={{marginBottom: '20px'}}>
      filter <input onChange={
        (event) => dispatch({ type: 'SET_FILTER', payload: event.target.value })} />
    </div>
  )
}

export default Filter