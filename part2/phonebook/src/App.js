import React, { useState } from 'react'

const Persons = ({ persons }) => <div>{persons.map(person => <p key={person.name}>{person.name}</p>)}</div>

const App = () => {
  const [ persons, setPersons ] = useState([])// { name: 'Arto Hellas' } 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName
    }
    setPersons(persons.concat(person))
    setNewName('')
    console.log(persons);
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
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