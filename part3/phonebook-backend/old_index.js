const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('post-data', function (request, _) {
  if (request.method === 'POST') return JSON.stringify(request.body);
});

app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-data'
  )
);

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

const generateID = () => Math.floor(Math.random() * 999999 + 1);

app.get('/api/persons', (_, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) response.json(person);
  else response.status(404).end();
});

app.get('/info', (_, response) => {
  const info = `Phonebook has info for ${persons.length} people`;
  const date = new Date();

  const infoHtml = `
        <div>
            <p>${info}</p>
            <p>${date}</p>
        </div>
    `;

  response.send(infoHtml);
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.name || !body.number)
    return response.status(404).json({ error: 'name or number is missing' });

  const isPersonRepeated = persons.find((person) => person.name === body.name);

  if (isPersonRepeated)
    return response.status(409).json({ error: 'name must be unique' });

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons = persons.concat(person);
  response.json(persons);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
