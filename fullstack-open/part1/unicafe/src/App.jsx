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

  const Statistics = (props) => {

    if (props.all === 0) {
      return "No feedback given"
    }
    return (
      <>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.all}</p>
        <p>average {props.average}</p>
        <p>positive {props.positive*100}%</p>
      </>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>

      {/* buttons */}
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      {/* statistics */}
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} average={average} all={all} positive={positive}/>
    </div>
  )
}

export default App