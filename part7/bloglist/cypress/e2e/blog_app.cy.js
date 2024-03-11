describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', { username: 'test', name: 'test', password: 'test' })
    cy.request('POST', 'http://localhost:3003/api/users/', { username: 'mluukkai', name: 'Matti Luukkainen', password: 'salainen' })
    cy.visit('')
  })
  it('login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('Login')
    cy.get('#username').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#login-button').should('be.visible')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('test logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('123')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
        .should('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'test logged in')
      cy.contains('test logged in').should('not.exist')
    })
  })
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'test', password: 'test' })
    })
    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[placeholder="write the title"]').type('a title')
      cy.get('input[placeholder="write the author"]').type('an author')
      cy.get('input[placeholder="write the url"]').type('an url')
      cy.get('button[type="submit"]').click()
      cy.contains('a title')

      cy.get('.success')
        .should('contain', 'a new blog a title by an author added')
        .should('have.css', 'color', 'rgb(0, 128, 0)')
        .should('have.css', 'border-style', 'solid')
    })
    describe('and a blog exists', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'another title',
          author: 'another author',
          url: 'another url',
          likes: 0
        })
        cy.login({ username: 'mluukkai', password: 'salainen' })
        cy.createBlog({
          title: 'a note created by cypress',
          author: 'Matti Luukkainen',
          url: 'mattiluukkainen.com',
          likes: 3
        })
      })
      it('a blog can be liked', function() {
        cy.contains('another title').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('0 likes')
        cy.get('@viewButton').parent().should('contain', 'like')
        cy.get('#like-button').click()
        cy.contains('1 likes')
      })
      it('a blog can be removed by the author', function() {
        cy.contains('another title').parent().find('button').as('firstViewButton')
        cy.get('@firstViewButton').click()
        cy.get('@firstViewButton').should('not.contain', 'remove')

        cy.contains('a note created by cypress').parent().find('button').as('secondViewButton')
        cy.get('@secondViewButton').click()
        cy.get('@secondViewButton').parent().should('contain', 'remove')
        cy.get('#remove-button').click()
        cy.window().then($window => $window.confirm(true))
        cy.contains('a note created by cypress').should('not.exist', { timeout: 5000 })
      })
      it('blogs are ordered by number of likes', function() {
        cy.get('.blog-style:first').should('contain', 'a note created by cypress')
        cy.get('.blog-style:last').should('contain', 'another title')
      })
    })
  })
})