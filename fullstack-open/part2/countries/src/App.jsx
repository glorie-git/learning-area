import { useState, useEffect } from "react"
import axios from "axios"
import Country from "./components/Country"

function App() {

  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState({})
  const [filteredCountries, setFilteredCountries] = useState([])
  const [message, setMessage] = useState(null)
  const [result, setResult] = useState(null)

  const getCountries = () => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then ( response => {
      console.log("Countries loaded")
      // console.log("Countries loaded")
      setCountries(response.data)
    })
  }

  useEffect(() => {
    getCountries()
  }, [])

  const countrySearch = () => {

    var fltedCountries = []

    countries.forEach( country => {
      const countryName = country.name.common
      // console.log(countryName.includes(query))

      if (countryName.toLowerCase().includes(query)) {
        fltedCountries.push(country)
      }
    })

    if (fltedCountries.length <= 10) {

      console.log("Number of countries found:", fltedCountries.length)

      if (fltedCountries.length === 1) {
        console.log("Displaying country.")
        console.log(fltedCountries)
        setResult(fltedCountries[0])
        setFilteredCountries([])
        
      } else {
        console.log("Setting filtered countries.")
        setFilteredCountries(fltedCountries)
        // removes previously displayed country
        setResult(null)
      }

      setMessage("")

    } else {
      setMessage("Too many matches. Specify another filter.")
      setFilteredCountries([])
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setQuery(event.target.value)
    countrySearch(event.target.value)
  }

  
  // monitor for empty query and update components respectively
  useEffect(() => {

    if (query === "") {
      setResult(null)
      setFilteredCountries([])
      setMessage("")
    } 
  }, [query])

  return (
    <>
      find countries:
      <input onChange={handleChange}/>
      <p>{message}</p>
      <pre>
        {/* {JSON.stringify(result, null, 5)} */}
      </pre>

      <div>
        {console.log(filteredCountries)}
        {/* <ul>
          { filteredCountries ? 
            filteredCountries.map ( country => { return <li key={country.name}>{country.name}</li>}): null}
        </ul> */}
      </div>
      <div>
          { result ?
            <>
                <Country result={result} languages={result.languages}/>
            </>
            : null}
      </div>
    </>
  )
}

export default App
