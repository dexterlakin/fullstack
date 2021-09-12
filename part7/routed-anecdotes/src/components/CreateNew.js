import {
  useHistory
} from "react-router-dom"
import { useField } from '../hooks'


const CreateNew = (props) => {
  const content = useField('content')
  const author = useField('author')
  const info = useField('info')

  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    history.push('/anecdotes')

  }

  const reset = (e) => {
    e.preventDefault()
    content.onChange({ type: 'reset' })
    author.onChange({ type: 'reset' })
    info.onChange({ type: 'reset' })
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            value={content.value}
            type={content.type}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            value={author.value}
            type={author.type}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input
            value={info.value}
            type={info.type}
            onChange={info.onChange}
          />
        </div>
        <button>create</button>
        <button onClick={reset}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
