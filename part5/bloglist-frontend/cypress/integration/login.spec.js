describe('Login',function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.fixture('user').then((user) =>
      cy.request('POST', 'http://localhost:3003/api/users/', user)
    )
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('button')
      .should('contain', 'log in')
  })

  it('fails with wrong credentials', function() {
    cy.login('invalid-user', 'invalid-password')
    cy.get('.error')
      .contains('Wrong credentials')
      .should('have.css', 'color', 'rgb(255, 0, 0)')
  })

  it('succeeds with correct credentials', function() {
    cy.fixture('user').then((user) => {
      cy.login(user.username, user.password)
      cy.get('.notification')
        .contains(`${user.username} logged in.`)
    })
    cy.get('#logoutButton')
      .click()
  })
})