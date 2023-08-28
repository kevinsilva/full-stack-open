const generateID = () => {
  const maxID =
    persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
  return maxID + 1;
};
