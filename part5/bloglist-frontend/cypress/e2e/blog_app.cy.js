describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users/', { username: 'test', name: 'test', password: 'test' })
    cy.visit('')
    // cy.login({ username: 'test', password: 'test' })
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
  })
})