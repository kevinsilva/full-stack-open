const Filter = ({ filterCountry, handleChange }) => {
  return (
    <div>
      find countries: <input value={filterCountry} onChange={handleChange} />
    </div>
  );
};

export default Filter;
