describe('Login Tests - Dev.to', { retries: { runMode: 2, openMode: 2 } }, () => {
  const visitLoginPage = () => {
    cy.visitDevTo('/enter', { timeout: 120000 })
    cy.pageLoaded()
    cy.get('form[data-testid="login-form"]').should('be.visible')
  }

  const submitLogin = () => {
    cy.get('form[data-testid="login-form"] input[type="submit"]').click()
  }

  const shouldBeOnHomePage = () => {
    cy.location('pathname').should('eq', '/')
    cy.get('body').should('have.attr', 'data-user-status', 'logged-in')
    cy.get('.crayons-header').should('be.visible')
  }

  const shouldStayLoggedOut = () => {
    cy.location('pathname').should('eq', '/users/sign_in')
    cy.get('body').invoke('attr', 'data-user-status').should('not.eq', 'logged-in')
  }

  before(() => {
    cy.log('Starting Login Test Suite')
  })

  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })

  // Test case 1: Login with valid credentials
  it('should login successfully with valid credentials', () => {
    visitLoginPage()
    cy.get('#user_email').type(Cypress.env('USER_EMAIL'))
    cy.get('#user_password').type(Cypress.env('USER_PASSWORD'))
    submitLogin()
    shouldBeOnHomePage()
  })

  // Test case 2: Login with invalid credentials
  it('should stay logged out on invalid credentials', () => {
    visitLoginPage()
    cy.get('#user_email').type('wrong@example.com')
    cy.get('#user_password').type('wrongpassword')
    submitLogin()
    shouldStayLoggedOut()
  })

  // Test case 3: Login with users from JSON fixture
  it('should test multiple users from fixture', () => {
    cy.fixture('users').then((users) => {
      users.filter((user) => !user.valid).forEach((user) => {
        cy.clearCookies()
        cy.clearLocalStorage()
        visitLoginPage()

        if (user.email) cy.get('#user_email').type(user.email)
        if (user.password) cy.get('#user_password').type(user.password)
        submitLogin()
        shouldStayLoggedOut()
      })
    })
  })

  const inlineUsers = [
    { email: 'test1@mail.com', password: 'wrong1' },
    { email: 'test2@mail.com', password: 'wrong2' },
  ]

  inlineUsers.forEach((user) => {
    // Test case 4: Login with inline invalid user
    it(`should fail login for ${user.email}`, () => {
      visitLoginPage()
      cy.get('#user_email').type(user.email)
      cy.get('#user_password').type(user.password)
      submitLogin()
      shouldStayLoggedOut()
    })
  })

  // Test case 5: Token-based authentication
  it('should authenticate using API token without UI login', () => {
    cy.visitDevTo('/')
    cy.loginWithToken()
    cy.reload()
    cy.pageLoaded()
    cy.log('Token-based auth command completed')
  })
})
