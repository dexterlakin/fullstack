describe('Blog app',function() {
  describe('When logged in',function() {
    before(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.fixture('user').then((user) => {
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.login(user.username, user.password)
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog')
        .click()
      cy.fixture('blog').then((blog) => {
        cy.get(':nth-child(1) > input')
          .type(blog.title)
        cy.get(':nth-child(2) > input')
          .type(blog.author)
        cy.get(':nth-child(3) > input')
          .type(blog.url)
        cy.get('.NewBlogForm > button')
          .click()

        cy.get('.blog > button')
          .click()
        
        cy.get('.blog > :nth-child(1) > :nth-child(1)')
          .then((it) => {
            expect(it).to.have.text(`${blog.title} ${blog.author}`)
          })
          
      })
    })

    it('A blog can be liked', function() {
      cy.contains('0 likes')

      cy.get('button').contains('like')
        .click()

      cy.contains('1 likes')
    })
  })
})