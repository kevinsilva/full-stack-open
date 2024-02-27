import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'
import blogService from '../services/blogs'

describe('BlogForm', () => {
  test('form calls event handler with right details when submitted', async () => {
    const onNewBlog = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm onNewBlog={onNewBlog} onMessage={jest.fn()}/>)
    const createMock = jest.spyOn(blogService, 'create').mockResolvedValueOnce();

    const titleInput = screen.getByPlaceholderText('write the title')
    const authorInput = screen.getByPlaceholderText('write the author')
    const urlInput = screen.getByPlaceholderText('write the url')
    const button = screen.getByText('create')

    await user.type(titleInput, 'random title')
    await user.type(authorInput, 'random author')
    await user.type(urlInput, 'random url')
    await user.click(button)

    expect(createMock).toHaveBeenCalledTimes(1)
    expect(onNewBlog.mock.calls).toHaveLength(1)
    expect(blogService.create).toHaveBeenCalledTimes(1)
    expect(blogService.create).toHaveBeenCalledWith({
      title: 'random title',
      author: 'random author',
      url: 'random url',
    })
  })
})