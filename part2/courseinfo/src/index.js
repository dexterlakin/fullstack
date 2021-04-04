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

const Courses = ({ courses }) => <div>{courses.map(course => <Course course={course} key={course.id}/>)}</div>

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  

  return(
    <div>
      {<Courses courses={courses}/>}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))