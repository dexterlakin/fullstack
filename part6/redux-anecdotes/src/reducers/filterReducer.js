const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER/SET':
      return action.filter
    default:
      return state
  }
}

const setFilter = (filter) => {
  return (
    {
      type: 'FILTER/SET',
      filter: filter,
    }
  )
}

export { filterReducer, setFilter }
