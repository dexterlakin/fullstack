import { setFilter } from '../reducers/filterReducer'
import { useSelector, useDispatch } from 'react-redux'
import React from 'react'

const Filter = () => {

  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const handleChange = (event) => {
    // input-field value is in variable
    dispatch(setFilter(event.target.value))
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter
