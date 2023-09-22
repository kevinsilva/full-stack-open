require('dotenv').config();
const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose
  .connect(URI)
  .then(() => {
    console.log('Connected to database.');
  })
  .catch((err) => {
    console.log('Error connecting to database: ', err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: function (phoneNumber) {
        const regexValidation = /^[0-9]{2,3}-[0-9]{7,8}$/;
        return regexValidation.test(phoneNumber);
      },
      message:
        'Phone number is not valid. The valid format is either XX-XXXXXXXX or XXX-XXXXXXX.',
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
