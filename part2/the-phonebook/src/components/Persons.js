const Persons = ({ persons, filterName, handleRemove }) => {
  return (
    <>
      {persons
        .filter((person) =>
          person.name.toLowerCase().includes(filterName.toLowerCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={() => handleRemove(person)}>delete</button>
          </div>
        ))}
    </>
  );
};

export default Persons;
