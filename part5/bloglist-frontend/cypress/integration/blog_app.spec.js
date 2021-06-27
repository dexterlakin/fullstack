const user = {
  name: 'Dexter Lakin',
  username: 'dlakin',
  password: 'dlakin'
}

describe('Login',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('button')
    .should('contain', 'log in')
  })

  it('fails with wrong credentials', function() {
    cy.contains('log in')
    .click()
    cy.get('input#username')
      .type('invalid-user')
    cy.get('input#password')
      .type('invalid-user')
    cy.get('#login-button')
      .click()
    cy.get('.error')
      .contains('Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('succeeds with correct credentials', function() {
    cy.contains('log in')
    .click()
    cy.get('input#username')
      .type(user.username)
    cy.get('input#password')
      .type(user.password)
    cy.get('#login-button')
      .click()
    cy.get('.notification')
      .contains(`${user.username} logged in.`)
    cy.get('#logoutButton')
      .click()

  })
})