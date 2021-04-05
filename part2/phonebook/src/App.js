import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) => {

  return(
  <div>
    <form>
      <input
        value={props.searchTerm}
        onChange={props.handleSearch}
      />
    </form>
  </div>
  )
}

const PersonForm = (props) => {

  return(
  <div>
    <form onSubmit={props.addPerson}>
        <div>
          name: <input
            value={props.newName}
            onChange={props.handleNameChange}
            />
        </div>
        <div>
          number: <input
            value={props.newNumber}
            onChange={props.handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )
}

const Persons = (props) => {
  var filteredPersons = props.persons.filter(function(person) {
    return person.name.toLowerCase().includes(props.searchTerm.toLowerCase())
  })
  
  return(
    <div>
      {filteredPersons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    // todo: phone number validation

    if (persons.some(p => p.name === newName)) {
      console.log('duplicate')
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat(person))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <h3>Add a new</h3>

      <PersonForm 
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h3>Number</h3>

      <Persons
        persons={persons}
        searchTerm={searchTerm}
      />      
    </div>
  )
}

export default App