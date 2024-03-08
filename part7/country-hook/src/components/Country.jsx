const Country = ({ country }) => {
  if (country.error) return <div>not found...</div>
  if (!country.data) return null

  return (
    <div>
      <h3>{country.data.name.common} </h3>
      <div>capital {country.data.capital[0]} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags.png}
        height='100'
        alt={`flag of ${country.name}`}
      />
    </div>
  )
}

export default Country
