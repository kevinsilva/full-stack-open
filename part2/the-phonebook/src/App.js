import { useState } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Header from './components/Header';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

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
