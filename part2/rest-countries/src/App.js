import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import Countries from './components/Countries';
import countryService from './services/getCountry';

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState('');

  useEffect(() => {
    countryService
      .getAll()
      .then((returnedCountries) => {
        const formattedCountries = returnedCountries.map(
          ({ name, capital, area, languages, flags }) => ({
            name: name.common,
            capital,
            area,
            languages,
            flags,
          })
        );
        setCountries(formattedCountries);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Filter
        filterCountry={filterCountry}
        handleChange={(event) => setFilterCountry(event.target.value)}
      />
      {filterCountry && (
        <Countries countries={countries} filterCountry={filterCountry} />
      )}
    </div>
  );
}

export default App;
