import axios from 'axios';

const baseUrl = '/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  return request.then((response) => response.data);
};

const remove = (personID) => {
  const request = axios.delete(`${baseUrl}/${personID}`);
  return request.then((response) => response.data);
};

const update = (personID, newNumber) => {
  const request = axios.put(`${baseUrl}/${personID}`, newNumber);
  return request.then((response) => response.data);
};

const personService = { getAll, create, remove, update };

export default personService;
