import React, { useState } from 'react'

const Display = ({counter, text}) => <div>{text} {counter}</div>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <h1>statistics</h1>
      <Display counter={`good ${good}`}/>
      <Display counter={`neutral ${neutral}`}/>
      <Display counter={`bad ${bad}`}/>
      <Display counter={`total ${good + neutral + bad}`}/>
      <Display counter={`average ${good - bad}`}/>
      <Display counter={`positive ${good / (good + neutral + bad) * 100} %`}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGoodByOne = () => setGood(good + 1)
  const increaseNeutralByOne = () => setNeutral(neutral + 1)
  const increaseBadByOne = () => setBad(bad + 1)


  return(
    <div>
      <div>
        <h1>give feedback</h1>
      </div>
      <Button
        handleClick={increaseGoodByOne}
        text='good'
      />
      <Button
        handleClick={increaseNeutralByOne}
        text='neutral'
      />
      <Button
        handleClick={increaseBadByOne}
        text='bad'
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App