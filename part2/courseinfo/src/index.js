import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ course }) => <p>Number of exercises {course.parts.reduce((s, p) => s + p.exercises, 0)}</p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ course }) => <div>{course.parts.map(part => <Part part={part} key={part.id}/>)}</div>

const Course = ({ course }) => {
  return(
    <div>
      <Header course={course}/>
      <Content course={course}/>
      <Total course={course}/>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return(
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))