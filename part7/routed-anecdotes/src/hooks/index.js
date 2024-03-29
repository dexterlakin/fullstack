import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    // reset button click
    if (event.type === 'reset') {
      setValue('')
    } else {
      setValue(event.target.value)
    }
  }

  return {
    type,
    value,
    onChange
  }
}
