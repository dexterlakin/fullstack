const { _, $ } = Cypress

describe('Blog app', function () {
  describe('When logged in', function () {
    before(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.fixture('user').then((user) => {
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.login(user.username, user.password)
      })
    })

    it('A blog can be created', function () {
      cy.fixture('blog').then((blog) => {
        cy.createBlog(blog)
        cy.get('.blog > button')
          .click()
          .get('.blog > :nth-child(1) > :nth-child(1)')
          .then((it) => {
            expect(it).to.have.text(`${blog.title} ${blog.author}`)
          })

      })
    })

    it('A blog can be liked', function () {
      cy.contains('0 likes')
      cy.get('button').contains('like')
        .click()
      cy.contains('1 likes')
    })

    it('the user who created a blog can delete it', function () {
      cy.get('button').contains('remove')
        .click()
    })
  })

  describe('When many blogs', function () {
    before(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.fixture('user').then((user) => {
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.login(user.username, user.password)
      })

      cy.fixture('blog').then((blog) => {
        cy.createBlog(blog)
      })
      cy.fixture('blog_2').then((blog) => {
        cy.createBlog(blog)
      })
      cy.fixture('blog_3').then((blog) => {
        cy.createBlog(blog)
      })
    })

    it('Blogs are ordered by number of likes', function () {
      cy.get('button:contains(view)').each(($el, index, $list) => {
        cy.wrap($el).click()
      })

      cy.get('button:contains(like)').each(($el, index, $list) => {
        _.times(index, () => cy.wrap($el).click())
      })

      cy.get('text:contains(likes)')
        .should(($t) => {

          let texts = $t.map((i, el) =>
            Cypress.$(el).text())

          texts = texts.get()

          expect(texts).to.have.length(3)

          expect(texts, 'has expected number of likes').to.deep.eq([
            '2 likes',
            '1 likes',
            '0 likes',
          ])
        })
    })
  })
})