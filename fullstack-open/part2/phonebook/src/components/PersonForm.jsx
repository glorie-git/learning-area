const PersonForm = (props) => {
    // console.log(props)
    return (
      <form onSubmit={props.onSubmit}>
        
        <div>name: <input value={props.name} onChange={props.nameHandler}/></div>
        <div>number: <input value={props.number} onChange={props.numberHandler}/></div>
  
        <div>
          <button type="submit">add</button>
        </div>
  
      </form>
    )
  }

  export default PersonForm