/**
 * skenario testing
 *
 * - LogIn page
 *   - should display login page correctly
 *   - should display alert when email or password are wrong
 *   - should display alert "Authenticated as {entered email}" when username and password are correct
 */

describe('LogIn page spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('should display login page correctly', () => {
    cy.get('input[placeholder="Enter your email"]').should('be.visible')
    cy.get('input[placeholder="Enter your password"]').should('be.visible')
    cy.get('button')
      .contains(/^Log in$/)
      .should('be.visible')
  })

  it('should display alert when email or password are wrong', () => {
    cy.get('input[placeholder="Enter your email"]').type('email@testing.co')
    cy.get('input[placeholder="Enter your password"]').type('passwordtestin')

    cy.get('button')
      .contains(/^Log in$/)
      .click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong')
    })
  })

  it('should display alert "Authenticated as {entered email}" when username and password are correct', () => {
    cy.get('input[placeholder="Enter your email"]').type('email@testing.com')
    cy.get('input[placeholder="Enter your password"]').type('passwordtesting')

    cy.get('button')
      .contains(/^Log in$/)
      .click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Authenticated as email@testing.com')
    })
  })
})
