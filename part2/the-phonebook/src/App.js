import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Header from './components/Header';
import personService from './services/Person';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    personService.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const isNameRepeated = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const newPerson = { name: newName, number: newNumber };

    if (isNameRepeated) alert(`${newName} already in the phonebook.`);
    else
      personService.create(newPerson).then((returnedPerson) => {
        setPersons([...persons, returnedPerson]);
      });

    setNewName('');
    setNewNumber('');
  };

  const removeName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(
          persons.filter((addedPerson) => addedPerson.id !== person.id)
        );
      });
    }
  };

  const handleChange = (setChange) => (e) => {
    setChange(e.target.value);
  };

  return (
    <div>
      <Header title="Phonebook" type="main" />
      <Filter
        filterName={filterName}
        handleChange={handleChange(setFilterName)}
      />
      <Header title="add a new" />
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleName={handleChange(setNewName)}
        handleNumber={handleChange(setNewNumber)}
      />
      <Header title="Numbers" />
      <Persons
        persons={persons}
        filterName={filterName}
        handleRemove={removeName}
      />
    </div>
  );
};

export default App;
