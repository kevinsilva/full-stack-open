import Weather from './Weather';

const Country = ({ data }) => {
  console.log(data.capital[0]);
  return (
    <>
      <h1>{data.name}</h1>
      <div>capital {data.capital[0]}</div>
      <div>area {data.area}</div>
      <h2>languages</h2>
      <ul>
        {Object.values(data.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={data.flags.png} alt={`Flag of ${data.name}`}></img>
      {data.capital[0] && <Weather city={data.capital[0]} />}
    </>
  );
};

export default Country;
