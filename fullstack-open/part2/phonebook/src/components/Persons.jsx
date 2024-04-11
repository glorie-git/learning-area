import Person from './Person'

const Persons = (props) => {
    // persons.map( (person) => <Person key={person.name} person={person}/>)
    // console.log(props)
    return (
      props.persons.map( (person) => <Person key={person.id} person={person}/>)
    )
  }

  export default Persons