describe('Studio Generated Test - Dev.to', () => {
  // Test case 1: Browse homepage and open article
  it('studio recorded: browse homepage and open article', () => {
    cy.visitDevTo('/')
    cy.get('#main-content').should('exist')
    cy.get('.crayons-story:not(.crayons-story__billboard)').first().should('be.visible')
    cy.get('.crayons-story:not(.crayons-story__billboard)')
      .first()
      .find('a.crayons-story__hidden-navigation-link, h2 a, h3 a')
      .filter(':visible')
      .first()
      .click()
    cy.get('article').should('exist')
  })

  // Test case 2: Studio recorded search interaction
  it('studio recorded: search interaction', () => {
    cy.searchFor('cypress')
    cy.get('body').should('not.contain', 'Something went wrong')
  })
})
