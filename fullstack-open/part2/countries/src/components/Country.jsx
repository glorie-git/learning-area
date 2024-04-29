const Country = ({result}) => {

    return (
        <>
            <h1>{result.name.common}</h1>
            <p>Capital: {result.capital}</p>
            <p>Area: {result.area}</p>
            <h2>Languages</h2>
            <ul>
                {/* <Country languages={result.languages}/> */}
                {Object.entries(result.languages).map(
                language => { return <li key={language[1]}>{language[1]}</li>}
            )}
            </ul>
            <img src={result.flags.png} alt={result.flags.alt}/>
        </>

    )
}

export default Country