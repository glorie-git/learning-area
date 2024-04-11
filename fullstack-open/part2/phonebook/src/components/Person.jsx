const Person = (props) => {
    return (
      <div>
        {props.person.name} {props.person.number}
        <button onClick={() => props.onDelete(props.person)}>delete</button>
      </div>
    )
  }

  export default Person