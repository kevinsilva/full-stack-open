require('dotenv').config();
const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please give password as argument');
  process.exit(1);
}

const URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to database.');
  })
  .catch((err) => {
    console.log(err);
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

if (password !== process.env.PASSWORD) {
  console.log('Invalid password');
  process.exit(1);
}

if (name && number) {
  const newPerson = new Person({
    name: name,
    number: number,
  });

  newPerson
    .save()
    .then(() => {
      console.log(`Added ${name} with number ${number} to the phonebook`);
      mongoose.connection.close();
    })
    .catch((error) => {
      console.error('ERROR: ', error);
      mongoose.connection.close();
    });
} else {
  Person.find({}).then((persons) => {
    console.log('Phonebook:');
    persons.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
