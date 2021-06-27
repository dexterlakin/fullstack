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
      cy.fixture('blog').then((blog) => {
        cy.createBlog(blog)
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

    it('the user who created a blog can delete it', function() {
      cy.get('button').contains('remove')
        .click()
    })
  })
})