import React, { useState } from 'react'

const Persons = ({ persons }) => {
  return(
  <div>
    {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
  </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) // { name: 'Arto Hellas' }
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    // todo: number validation

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>debug: {newName}</div>
      <form onSubmit={addPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handleNameChange}
            />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
            />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={persons}/>
      ...
    </div>
  )
}

export default App