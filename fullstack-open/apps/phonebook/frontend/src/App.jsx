import { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  

  // our hook gets data from our json-server using axios
  const hook = () => {
    personService
      .getAll()
      .then(response => {
        const persons = response
        setPersons(persons)
        // console.log("In hook ", persons)
      })
  }

  // [] means we only want the effect to run during the first render
  useEffect(hook,[])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [filterOn, setFilterOn] = useState(false)
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notification, setNotification] = useState({message: null, type: "success"})
  console.log(notification)

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

  // Function to update value of input element
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  // Function to search for a name in the phonebook
  // Return: bool
  const inPhonebook = (name) => {

    const names = persons.map((person) => person.name)
    if (names.includes(name)) {
      return persons.find( person => person.name === name)
    }
    return names.includes(name)
  }

  // Function adds a person into the phonebook
  const addPerson = (event) => {
    event.preventDefault()

    // check if we have this name already
    const found = inPhonebook(newName)

    if (found) {

       // Name is already in the phonebook
      if (window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)) {
        personService.updatePerson(found.id, {...found, number: newNumber})
        .then ( response => {

          console.log(`update person response: ${response}`)
          }
        )
        .catch ( error =>
          alert (
            `There was an error adding the person ${newName} ${newNumber} to phone book. Please try again. Error ${error}`
          )
        )     
      }
    } else {

        // Add a person who is not already in phone book
        const newPerson = {name: newName, number: newNumber}
        personService.create(newPerson)
        .then ( response => {
          console.log(response)
          const newPersons = persons
          newPersons.push(newPerson)

          setNotification({message: `${newName} has been successfully added.`, type: "success"})
          setTimeout(() => {
            setNotification({message: null, type: ""})
          }, 5000)

          setPersons(newPersons)
          }
        )
        .catch ( error =>
          alert (
            `There was an error adding the person ${newName} ${newNumber} to phone book. Please try again. Error ${error}`
          ),
          setNotification({message: `There was an error adding ${newName}.`, type: "error"})
        )     
      }

    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) => {

    if (window.confirm(`Delete ${person.name}?`)) {
      const changedPersons = persons.filter ( n => n.id !== person.id)
      personService.deletePerson(person.id)
      .then ( response =>
        setPersons(changedPersons)
      )
      .catch (error => {
        alert(`There was an error deleting the person. Error: ${error}`)
      })
    }
  }

  const displayNotification = () => {


  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type}/>
      <Filter value={filter} onChange={handleFilter}/>
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} name={newName} number={newNumber} nameHandler={handleChange} numberHandler={handleNewNumber}/>
      <h2>Numbers</h2>
      <div>
        {filterOn ? 
          <Persons persons={filteredPersons} onDelete={handleDelete}/>
          : <Persons persons={persons} onDelete={handleDelete}/>
        }
      </div>

    </div>
  )
}

export default App