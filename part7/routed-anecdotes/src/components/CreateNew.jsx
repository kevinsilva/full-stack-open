import { useField } from '../hooks'

const CreateNew = (props) => {
  const { clear: clearContent, ...content } = useField('text')
  const { clear: clearAuthor, ...author } = useField('text')
  const { clear: clearInfo, ...info } = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    })
  }

  const handleClear = () => {
    clearContent()
    clearAuthor()
    clearInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button type='submit'>create</button>
        <button type='reset' onClick={handleClear}>
          clear
        </button>
      </form>
    </div>
  )
}

export default CreateNew
