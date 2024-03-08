import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

export const getCountry = async (country) => {
  const response = await axios.get(`${baseUrl}/name/${country}`)
  return response.data
}
