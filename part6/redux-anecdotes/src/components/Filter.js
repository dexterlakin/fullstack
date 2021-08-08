import { setFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'
import React from 'react'

const Filter = (props) => {

  const handleChange = (event) => {
    // input-field value is in variable
    props.setFilter(event.target.value)
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

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)

export default ConnectedFilter
