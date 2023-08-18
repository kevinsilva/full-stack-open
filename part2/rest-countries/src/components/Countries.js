import { useState } from 'react';
import Country from './Country';

const Countries = ({ countries, filterCountry }) => {
  const [showClicked, setShowClicked] = useState(null);

  const findCountry = (name) =>
    countries.find(
      (country) => country.name.toLowerCase() === name.toLowerCase()
    );

  const exactMatch = findCountry(filterCountry);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filterCountry.toLowerCase())
  );

  const handleClick = (name) => {
    setShowClicked(findCountry(name));
  };

  if (exactMatch) {
    return <Country data={exactMatch} />;
  }

  if (filteredCountries.length === 1) {
    return <Country data={filteredCountries[0]} />;
  }

  if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  return (
    <>
      {filteredCountries.map(({ name }) => (
        <div key={name}>
          {name} <button onClick={() => handleClick(name)}>show</button>
        </div>
      ))}
      {showClicked && <Country data={showClicked} />}
    </>
  );
};

export default Countries;
