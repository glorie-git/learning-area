import { useState } from 'react'

const App = () => {

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [positive, setPositive] = useState(0)

  // the average score (good: 1, neutral: 0, bad: -1)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood)
    setAll(updatedAll)
    setAverage((updatedGood - bad) / updatedAll)
    setPositive(updatedGood / updatedAll)
  }

  const handleNeutralClick = () => {
    // const updatedNeutral = neutral + 1
    setNeutral(neutral + 1)
    const updatedAll = all + 1
    setAll(updatedAll)
    setPositive(good / updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1

    setBad(updatedBad)
    setAll(updatedAll)
    setAverage((good - updatedBad) / updatedAll)
    setPositive(good / updatedAll)
  }

  const StatisticLine = (props) => {
    return ( 
      <>
        <td>{props.text}</td><td>{props.value}</td>
      </> 
    )
  }

  const Statistics = (props) => {

    if (props.all === 0) {
      return "No feedback given"
    }
    return (
      <>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={good}/></tr>
          <tr><StatisticLine text="neutral" value={neutral}/></tr>
          <tr><StatisticLine text="bad" value={bad}/></tr>
          <tr><StatisticLine text="all" value={all}/></tr>
          <tr><StatisticLine text="average" value={average}/></tr>
          <tr><StatisticLine text="positive" value={positive*100 + `%`}/></tr>
        </tbody>
      </table>
      </>
    )
  }

  const Button = (props) => {
    return <button onClick={props.onClick}>{props.text}</button>
  }

  return (
    <div>
      <h1>give feedback</h1>

      {/* buttons */}

      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>

      {/* statistics */}
      <h1>statistics</h1>
      
      <Statistics good={good} neutral={neutral} bad={bad} average={average} all={all} positive={positive}/>
      
    </div>
  )
}

export default App