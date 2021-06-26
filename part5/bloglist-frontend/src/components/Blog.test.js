import React from 'react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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

  const component = render(
    <Blog
      blog={blog}
      user={user}
    />
  )

  component.debug()

  const li = component.container.querySelector('li')

  console.log(prettyDOM(li))

  expect(component.container).toHaveTextContent(
    `${blog.title} ${blog.author}`
  )

  expect(component.container).not.toHaveTextContent(
    `${blog.url} ${blog.likes}`
  )
})
