import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(5).fill(0))
  const [indexOfMostVotes, setMostVotes] = useState(0)

  const handleVoteClick = () => {
    const newVotes = [ ...votes ]
    newVotes[selected] += 1 ;
    setVotes(newVotes);
    let newIndexOfMostVotes = newVotes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
    setMostVotes(newIndexOfMostVotes);

  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
      </div>
      <div>
        <button onClick={handleVoteClick}>
          vote
        </button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 5))}>
          next anecdote
        </button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[indexOfMostVotes]}</p>
        <p>has {votes[indexOfMostVotes]} votes</p>
      </div>
    </div>
  )

}

export default App
