import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1234567'}
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
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
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* <div>debug: {newName}</div> */}
      <div>{persons.map( (person) => <div key={person.name}>{person.name} {person.number}</div>)}</div>
    </div>
  )
}

export default App