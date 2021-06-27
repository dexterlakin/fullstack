// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => {
  cy.contains('log in')
    .click()
  cy.get('input#username')
    .type(username)
  cy.get('input#password')
    .type(password)
  cy.get('#login-button')
    .click()
})

Cypress.Commands.add('createBlog', (blog) => {
  cy.contains('button', 'new blog')
    .click()
  cy.get(':nth-child(1) > input')
    .type(blog.title)
  cy.get(':nth-child(2) > input')
    .type(blog.author)
  cy.get(':nth-child(3) > input')
    .type(blog.url)
  cy.get('.NewBlogForm > button')
    .click()
})

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => {})
