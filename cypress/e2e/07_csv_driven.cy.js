const Papa = require('papaparse')

describe('CSV Data Driven Login Tests', { retries: { runMode: 2, openMode: 2 } }, () => {
  // Test case 1: Run login tests from CSV data
  it('should run login tests from CSV file', () => {
    cy.fixture('test_data.csv').then((csvContent) => {
      const records = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      }).data

      records.sort((a, b) => {
        const aIsSuccess = a.expected === 'success' ? 1 : 0
        const bIsSuccess = b.expected === 'success' ? 1 : 0
        return aIsSuccess - bIsSuccess
      }).forEach((data) => {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.visitDevTo('/enter', { timeout: 120000, retryOnNetworkFailure: true })
        cy.get('form[data-testid="login-form"]').should('be.visible')

        const username = data.expected === 'success' ? Cypress.env('USER_EMAIL') : data.username
        const password = data.expected === 'success' ? Cypress.env('USER_PASSWORD') : data.password

        if (username) cy.get('#user_email').type(username)
        if (password) cy.get('#user_password').type(password)
        cy.get('form[data-testid="login-form"] input[type="submit"]').click()

        if (data.expected === 'success') {
          cy.location('pathname').should('eq', '/')
          cy.get('body').should('have.attr', 'data-user-status', 'logged-in')
        } else {
          cy.location('pathname').should('eq', '/users/sign_in')
          cy.get('body').invoke('attr', 'data-user-status').should('not.eq', 'logged-in')
        }

        cy.log(`Tested: ${data.username} -> Expected: ${data.expected}`)
      })
    })
  })
})
