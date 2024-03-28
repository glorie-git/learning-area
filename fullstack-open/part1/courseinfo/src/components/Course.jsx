const Header = (props) => {
    // console.log(props)
    return(
      <h1>{props.course}</h1>
    )
  }
  
  const Part = (props) => {
    // console.log(props)
    return <p>{props.part} {props.exercises}</p>
  }
  
  const Content = (props) => {
    // console.log(props)
    return (
      <>
        {props.parts.map ( (part) => 
          <Part key={part.id} part={part.name} exercises={part.exercises}/>
        )}
      </>
    )
  }
  
  const Total = ({course}) => {
    const totalExercises = course.parts.reduce ( (total, part) => 
      total + part.exercises, 0
    )
    return (
      <h4>total of {totalExercises} exercises</h4>
    )
  }
  
  const Course = ({course}) => {
    // const course = props.course
    return (
      <>
        <Header course={course.name}/>
        <Content parts = {course.parts}/>
        <Total course={course}/>
      </>
    ) 
  }

  export default Course