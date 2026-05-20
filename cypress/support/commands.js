Cypress.Commands.add('visitDevTo', (path = '/', options = {}) => {
  const baseUrl = (Cypress.env('BASE_URL') || 'https://dev.to').replace(/\/$/, '')
  const url = /^https?:\/\//.test(path)
    ? path
    : `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`

  cy.visit(url, options)
})

Cypress.Commands.add('loginUI', (email, password) => {
  cy.visitDevTo('/enter')
  cy.get('#user_email').clear().type(email)
  cy.get('#user_password').clear().type(password)
  cy.get('form[data-testid="login-form"] input[type="submit"]').click()
})

Cypress.Commands.add('loginWithToken', () => {
  const token = Cypress.env('AUTH_TOKEN')

  cy.window().then((win) => {
    win.localStorage.setItem('auth_token', token)
  })

  cy.setCookie('auth_token', token)
  cy.log(`Logged in with token prefix: ${token.substring(0, 8)}`)
})

Cypress.Commands.add('bypassLoginWithToken', () => {
  const token = Cypress.env('AUTH_TOKEN')

  cy.window().then((win) => {
    win.localStorage.setItem('api_token', token)
    win.localStorage.setItem('devto_user_token', token)
  })

  cy.setCookie('remember_user_token', token, {
    domain: 'dev.to',
    httpOnly: false,
  })

  cy.request({
    method: 'GET',
    url: 'https://dev.to/api/users/me',
    headers: { 'api-key': token },
    failOnStatusCode: false,
  }).then((res) => {
    if (res.status === 200) {
      cy.log(`Token verified for user: ${res.body.username}`)
    } else {
      cy.log('Token verification failed or token is a placeholder')
    }
  })
})

Cypress.Commands.add('searchFor', (keyword) => {
  cy.visitDevTo(`/search?q=${encodeURIComponent(keyword)}`)
  cy.pageLoaded()
  cy.location('pathname').should('eq', '/search')
  cy.location('search').should('include', `q=${encodeURIComponent(keyword)}`)
})

Cypress.Commands.add('goTo', (path) => {
  cy.visitDevTo(path)
  cy.url().should('include', path)
})

Cypress.Commands.add('pageLoaded', () => {
  cy.get('body').should('be.visible')
  cy.document().its('readyState').should('eq', 'complete')
})
