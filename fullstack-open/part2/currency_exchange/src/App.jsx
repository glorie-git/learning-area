import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [value, setValue] = useState("")
  const [currency, setCurrency] = useState(null)
  const [rates, setRates] = useState({})

  useEffect ( () => {
    console.log('in useEffect')

    if (currency) {
      axios
      .get(`https://open.er-api.com/v6/latest/${currency}`)
      .then( response => {
        // console.log(response.data)
        setRates(response.data.rates)
      })
    }

    console.log('end of useEffect')
  }, [currency])

  const handleChange = (event) => {
    // console.log(event.target.value)
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCurrency(value)
  }

  return (
    <>
    <form onSubmit={onSearch}>
      currency:
      <input value={value} onChange={handleChange}/>
      <button type="submit">exchange rate</button>
    </form>
    <pre>
      {JSON.stringify(rates, null, 2)}
    </pre>
    </>
  )
}

export default App
