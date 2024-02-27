import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import blogService from '../services/blogs'

describe('Blog', () => {
  test('renders blog title and author but not url or likes', () => {
    const blog = {
      title: 'random title',
      author: 'random author',
      url: 'random url',
      likes: 0
    }

    render(<Blog blog={blog} />)
    const element = screen.getByText(/random title/i)

    expect(element).toBeDefined()
    expect(element).toHaveTextContent(/random author/i)
    expect(element).not.toHaveTextContent(/random url/i)
    expect(element).not.toHaveTextContent(/likes/i)
  })
  test('renders url and likes when button is clicked', async () => {
    const blog = {
      title: 'random title',
      author: 'random author',
      url: 'random url',
      likes: 0,
      user: {
        name: 'random name'
      }
    }
    render(<Blog blog={blog} userInfo={{ name: 'random name' }} onMessage={jest.fn()}/>)
    const button = screen.getByText('view')

    expect(screen.queryByText(/random url/i)).toBeNull()
    expect(screen.queryByText(/likes/i)).toBeNull()

    await userEvent.click(button)

    expect(screen.getByText(/random url/i)).toBeDefined()
    expect(screen.getByText(/likes/i)).toBeDefined()
  })

  test('clicking like twice calls event handler twice', async () => {
    const blog = {
      title: 'random title',
      author: 'random author',
      url: 'random url',
      likes: 0,
      user: {
        name: 'random name'
      }
    }

    render(<Blog blog={blog} userInfo={{ name: 'random name' }} onMessage={jest.fn()}/>)
    const button = screen.getByText('view')
    await userEvent.click(button)

    const updateMock = jest.spyOn(blogService, 'update').mockResolvedValueOnce();

    const likeButton = screen.getByText('like')
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(updateMock).toHaveBeenCalledTimes(2);
  })
})