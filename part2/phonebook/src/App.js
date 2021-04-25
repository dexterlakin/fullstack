import React, { useState, useEffect } from 'react'
import personService from './services/persons'

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

const Person = ({ props, person }) => {

  const handleDeleteClick = (props) => {
    var deleteConfirm = window.confirm(`Delete ${person.name} ?`);
    if(deleteConfirm) {
      personService
      .deletePerson(person.id)
      .then(response => {
        props.setPersons(props.persons.filter(p => p.id !== props.id))
        console.log(`deleted ${person.name}`)
        personService
        .getAll()
        .then(allPersons => {
          props.setPersons(allPersons)
        })
      })
      .catch(error => {
        props.setNotificationMessage(`${person.name} was already deleted from server`)
        setTimeout(() => {
          props.setNotificationMessage(null)
        }, 5000)
        props.setPersons(props.persons.filter(p => p.id !== person.id))
      })
    }
  }

  return(
    <div>
      <p>{person.name} {person.number} <button onClick={() => handleDeleteClick(props)}>delete</button></p>
    </div>
  )
}


const Persons = (props) => {
  var filteredPersons = props.persons.filter(person => person.name.toLowerCase().includes(props.searchTerm.toLowerCase()))

  return(
    <div>
      {filteredPersons.map((person) =>
      <div key={person.name}>
        <Person
          props={props}
          person={person}
        />
      </div>
      )}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  let className='notification'
  if (message.includes('already deleted from server')) {
    className='error'
  }
  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchTerm, setSearchTerm ] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.some(p => p.name === newName)) {

      console.log('duplicate')

      var duplicate = persons.find(p => p.name === newName)

      if (duplicate.number === newNumber) {
        window.alert(`${duplicate.name} is already added to phonebook`);
      } else {
        var updateConfirm = window.confirm(`${duplicate.name} is already added to phonebook, replace the old number with a new one?`);
        if (updateConfirm) {
          personService
          .update(duplicate.id, person)
          .then(returnedPerson => {
            setNewName('')
            setNewNumber('')
            personService
            .getAll()
            .then(allPersons => {
              setPersons(allPersons)
            })
          })
        }
      }
      return;
    }

  personService
    .create(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewNumber('')
      setNotificationMessage(`Added ${person.name}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
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
      <Notification message={notificationMessage} />
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
        setNotificationMessage={setNotificationMessage}
        setPersons={setPersons}
        persons={persons}
        searchTerm={searchTerm}
      />
    </div>
  )
}

export default App
