describe('Navigation Tests - Dev.to', () => {
  before(() => {
    cy.visitDevTo('/')
  })

  // Test case 1: Navigate to Tags page
  it('should navigate to Tags page', () => {
    cy.visitDevTo('/tags')
    cy.url().should('include', '/tags')
    cy.get('.tag-card').should('have.length.greaterThan', 0)
    cy.get('.crayons-tag').first().should('be.visible')
  })

  // Test case 2: Navigate to JavaScript tag page
  it('should navigate to a specific tag page', () => {
    cy.visitDevTo('/t/javascript')
    cy.url().should('include', '/t/javascript')
    cy.get('h1').contains('javascript', { matchCase: false })
  })

  // Test case 3: Navigate to Listings page
  it('should navigate to Listings page', () => {
    cy.visitDevTo('/listings')
    cy.url().should('include', '/devteam/we-are-turning-off-listings')
    cy.get('body').should('be.visible')
  })

  // Test case 4: Navigate to Podcasts page
  it('should navigate to Podcasts page', () => {
    cy.visitDevTo('/pod')
    cy.pageLoaded()
    cy.get('body').should('be.visible')
  })

  // Test case 5: Open the first article
  it('should click on first article and open it', () => {
    cy.visitDevTo('/')
    cy.get('.crayons-story')
      .first()
      .find('a.crayons-story__hidden-navigation-link, h2 a, h3 a')
      .filter(':visible')
      .first()
      .click()
    cy.url().should('not.eq', 'https://dev.to/')
    cy.get('article').should('exist')
  })
})
