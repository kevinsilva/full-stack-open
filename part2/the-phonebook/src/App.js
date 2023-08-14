import { useState, useEffect } from 'react';
import Persons from './components/Persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Header from './components/Header';
import Notification from './components/Notification';
import personService from './services/Person';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch((error) => console.log(error));
  }, []);

  const addName = (e) => {
    e.preventDefault();
    const isNameRepeated = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const getPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    const newPerson = { name: newName, number: newNumber };

    if (isNameRepeated) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(getPerson.id, newPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== getPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => console.log(error));
        setMessageAndClear(`Changed ${newName}'s number`);
      }
    } else {
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
        })
        .catch((error) => console.log(error));
      setMessageAndClear(`Added ${newName}`);
    }

    setNewName('');
    setNewNumber('');
  };

  const removeName = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(
            persons.filter((addedPerson) => addedPerson.id !== person.id)
          );
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChange = (setChange) => (e) => {
    setChange(e.target.value);
  };

  const setMessageAndClear = (message) => {
    setMessage(message);
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div>
      <Header title="Phonebook" type="main" />
      <Notification message={message} />
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
