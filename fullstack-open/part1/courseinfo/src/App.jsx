import React, { useState, useEffect } from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Part = (props) => {
  // console.log(props)
  return <p>{props.part} {props.exercises}</p>
}

const Content = (props) => {
  // console.log(props)
  return (
    <div>
      <Part part={props.parts[0].name} exercises={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercises={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  // console.log(props)
  return <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises  + props.parts[2].exercises}</p>
}

const Hello = (props) => {

  const bornYear = () => {
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>

      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}

const App = () => {
  // const course = 'Half Stack application development'

  const course = {
    title: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.title}/>
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default App