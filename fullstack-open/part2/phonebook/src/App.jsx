import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterOn, setFilterOn] = useState(false)
  const [filteredPersons, setFilteredPersons] = useState([])

  const handleChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleFilter = (event) => {
    const newFilter = event.target.value
    setFilter(newFilter)
    
    // on input change, check if field is empty
    // if empty then we do not filter
    if (event.target.value.length > 0){
      // console.log(newFilter)

      // state filter state so we display filtered array
      setFilterOn(true)

      // loop through persons object and filter on objects with names
      // that include the string of value newFilter in it 
      const newPersons = persons.filter((person) => {
        // toLowerCase makes our search icase insensitive
        return person.name.toLowerCase().includes(newFilter)
      })

      // pass new filtered list
      setFilteredPersons(newPersons)
      // console.log(newPersons)

    } else {

      // if there are no characters on filter input field then set filter off and display default phone book
      setFilterOn(false)
      setFilteredPersons([])
    }
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const inPhonebook = (name) => {
    const names = persons.map ((person) => person.name)
    return names.includes(name)
  }

  const addPerson = (event) => {
    event.preventDefault()

    // check if we have this name already
    if (inPhonebook(newName)) {
      alert(`${newName} is already in the phonebook`)
    } else {

      const newPersons = persons
      newPersons.push({name: newName, number: newNumber})
      // console.log(newPersons)
      setPersons(newPersons)
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilter}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNewNumber}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filterOn ? 
          filteredPersons.map((person) => <div key={person.name}>{person.name} {person.number}</div>)
          : persons.map( (person) => <div key={person.name}>{person.name} {person.number}</div>)
        }
      </div>
    </div>
  )
}

export default App