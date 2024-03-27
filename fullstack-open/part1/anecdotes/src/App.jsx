import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const getRandom = (max) => {
    return Math.floor(Math.random() * max)
  }

  // var votingArray = new Uint8Array(anecdotes.length); 
  
  const handleClick = () => {
    // console.log("array length: ", anecdotes.length)
    const randomNumber = getRandom(anecdotes.length)
    // console.log("random number generated: ", randomNumber)
    setSelected(randomNumber)
  }

  const [votingArray, setVoteArray] = useState( new Uint8Array(anecdotes.length) )

  const handleVoteClick = (anecdoteIndex) => {

    // make copy of voting array
    const arrayCopy = [...votingArray]
    // console.log(arrayCopy)
    arrayCopy[anecdoteIndex] += 1
    // console.log(arrayCopy[anecdoteIndex])
    // console.log(arrayCopy)
    setVoteArray(arrayCopy)
  }

  const [selected, setSelected] = useState(0)

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <div>has {votingArray[selected]} votes</div>
      <button onClick={ () => handleVoteClick(selected)}>vote</button>
      <button onClick={handleClick}>next anecdote</button>
    </>
  )
}

export default App