import React from 'react'
import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { screen, render, fireEvent } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

const blog = {
  'title': 'DexterLakin',
  'author': 'Dexter Lakin',
  'url': 'https://dexterlakin.com/',
}

describe('<NewBlogForm />', () => {
  let component
  let form
  let titleInput
  let authorInput
  let urlInput

  let createBlog

  beforeEach(() => {
    createBlog = jest.fn()

    component = render(
      <NewBlogForm createBlog={createBlog} />
    )

    form = component.container.querySelector('form')
    titleInput = component.container.querySelector('input[name=title]')
    authorInput = component.container.querySelector('input[name=author]')
    urlInput = component.container.querySelector('input[name=url]') 
  })

  test('Renders content', () => {
    expect(component.container).toHaveTextContent('title:')
    expect(component.container).toHaveTextContent('author:')
    expect(component.container).toHaveTextContent('url:')
    expect(component.container).toHaveTextContent('create')
    expect(
      component.container.querySelector('form')
    ).toBeDefined()
    expect(
      component.container.querySelector('input')
    ).toBeDefined()
  })

  test('calls createBlog with correct params', () => {
    // arrange
    // set author, title, url
    
    fireEvent.change(titleInput, { 
      target: { value: blog.title } 
    })

    fireEvent.change(authorInput, { 
      target: { value: blog.author } 
    })

    fireEvent.change(urlInput, { 
      target: { value: blog.url } 
    })
    // act
    // submit
    fireEvent.submit(form)

    // assert
    // createBlog Mock called with correct params
    expect(createBlog).toHaveBeenCalledTimes(1)
    expect(createBlog).toHaveBeenCalledWith(blog)
  })
})
