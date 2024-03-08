import { useState, useEffect } from 'react'
import { getCountry } from '../services'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    clear,
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const formattedName = name.toLowerCase().replace(' ', '%20')
        const countryData = await getCountry(formattedName)

        setCountry(countryData)
        setError(null)
      } catch (error) {
        setCountry(null)
        setError(error)
      }
    }
    if (name) {
      fetchCountry()
    }
  }, [name])

  return { data: country, error }
}
