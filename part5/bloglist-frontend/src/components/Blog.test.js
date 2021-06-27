import React from 'react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {

  const user = { 'username': 'testuser' }

  const blog = {
    'title': 'DexterLakin',
    'author': 'Dexter Lakin',
    'url': 'https://dexterlakin.com/',
    'likes': 7,
    'user': user
  }

  const updateMockHandler = jest.fn()
  const deleteMockHandler = jest.fn()

  const component = render(
    <Blog
      blog={blog}
      user={user}
      updateBlog={updateMockHandler}
      deleteBlog={deleteMockHandler}
    />
  )

  const li = component.container.querySelector('li')

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container).not.toHaveTextContent(
    `${blog.url} ${blog.likes}`
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    `${blog.url}`
  )

  expect(component.container).toHaveTextContent(
    `${blog.likes} likes`
  )

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(updateMockHandler).toHaveBeenCalledTimes(2)

})
