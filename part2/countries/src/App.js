import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Filter = (props) => {

  return(
  <div>
    <form>find countries
      <input
        value={props.searchTerm}
        onChange={props.handleSearch}
      />
    </form>
  </div>
  )
}

const Country = ({ country, setWeather, weather }) => {
  
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  })

  return(
    <div>
      <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
      <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} width="400" alt="flag"/>
      <h2>Weather in {country.capital}</h2>
      <p><b>temperature: </b>{weather.current.temperature} Celsius</p>
      <img src={weather.current.weather_icons[0]} alt="weather-icon"/>
      <p><b>wind: </b>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
    </div>
  )
}

const Countries = ({ countries, setWeather, weather }) => {
  if (countries.length >= 10) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )    
  } else if (countries.length === 1) {

    return(
      <Country
        country={countries[0]}
        weather={weather}
        setWeather={setWeather}
      />
    )    
  }
  return(
    <div>
      {countries.map(country => <p key={country.name}>{country.name}</p>)}
    </div>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchTerm, setSearchTerm ] = useState('')
  const [ weather, setWeather ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=New%20York`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    filterCountries(event.target.value)
  }

  const filterCountries = (searchTerm) => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchTerm}`)
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
    }

  return (
    <div>
      <Filter
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <Countries
        countries={countries}
        weather={weather}
        setWeather={setWeather}
      />      
    </div>
  )
}

export default App