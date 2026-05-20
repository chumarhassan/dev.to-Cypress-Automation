describe('Visual Regression Tests - Dev.to', () => {
  // Test case 1: Homepage snapshot
  it('should match homepage snapshot', () => {
    cy.visitDevTo('/')
    cy.pageLoaded()
    cy.get('#main-content').should('be.visible')
    cy.matchImageSnapshot('homepage_baseline')
  })

  // Test case 2: Search results snapshot
  it('should match search results snapshot', () => {
    cy.visitDevTo('/search?q=javascript')
    cy.pageLoaded()
    cy.wait(2000)
    cy.matchImageSnapshot('search_results_javascript')
  })

  // Test case 3: Tags page snapshot
  it('should match tags page snapshot', () => {
    cy.visitDevTo('/tags')
    cy.pageLoaded()
    cy.matchImageSnapshot('tags_page')
  })

  // Test case 4: JavaScript tag page snapshot
  it('should match article page snapshot', () => {
    cy.visitDevTo('/t/javascript')
    cy.pageLoaded()
    cy.matchImageSnapshot('javascript_tag_page', {
      failureThreshold: 0.05,
    })
  })
})
