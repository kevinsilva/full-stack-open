import { useState, useEffect } from 'react';
import axios from 'axios';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Header from './components/Header';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    const eventHandler = (response) => setPersons(response.data);
    const promise = axios.get('http://localhost:3001/persons');

    promise.then(eventHandler);
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const isNameRepeated = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );

    if (isNameRepeated) alert(`${newName} already in the phonebook.`);
    else setPersons([...persons, { name: newName, number: newNumber }]);

    setNewName('');
    setNewNumber('');
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
      <Persons persons={persons} filterName={filterName} />
    </div>
  );
};

export default App;
