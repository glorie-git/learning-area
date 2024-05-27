require('dotenv').config();
const mongoose = require('mongoose');
// console.log(process.argv.length);
const argLength = process.argv.length;

// if (argLength < 3) {
//     console.log('give password as argument');
//     process.exit(1);
// }

const password = process.env.PASSWORD;
const url = process.env.MONGODB_URI;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

const Person = mongoose.model('Person', personSchema);

const name = process.argv[3];
if (argLength === 3) {
    // Display all of the entries in the phonebook
    console.log('Displaying all entries in phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person.name, person.number);
        })
        mongoose.connection.close()
    })
} else if (argLength === 5) {
    // If the name contains whitespace characters, it must be enclosed in quotes
    const number = process.argv[4];

    const person = new Person({
        name: name,
        number: number,
    })
    
    person.save().then(result => {
        console.log (`Added ${name} number ${number} to phonebook.`);
        mongoose.connection.close();
    })

} else {
    // Error in command
    console.log("Please double check your request.");
}

