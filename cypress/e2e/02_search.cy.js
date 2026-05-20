describe('Search Tests - Dev.to', () => {
  beforeEach(() => {
    cy.visitDevTo('/')
    cy.pageLoaded()
  })

  // Test case 1: Search with one keyword
  it('should search for a keyword and show results', () => {
    cy.searchFor('javascript')
    cy.get('.crayons-story').should('have.length.greaterThan', 0)
  })

  // Test case 2: Search with keywords from JSON fixture
  it('should search for multiple keywords from fixture', () => {
    cy.fixture('search_keywords').then((data) => {
      data.keywords.forEach((keyword) => {
        cy.searchFor(keyword)
        cy.wait(1500)
        cy.get('body').should('not.contain', 'Something went wrong')
        cy.log(`Searched: ${keyword}`)
      })
    })
  })

  // Test case 3: Display article cards on homepage
  it('should display article cards on homepage', () => {
    cy.get('#main-content')
      .find('.crayons-story')
      .first()
      .should('be.visible')
      .contains('a')
  })

  // Test case 4: Trigger hover on a tag
  it('should trigger hover effect on a tag', () => {
    cy.get('.crayons-tag').first().trigger('mouseover')
    cy.get('.crayons-tag').first().should('be.visible')
  })

  // Test case 5: Wait for dynamic articles
  it('should wait for articles to load', () => {
    cy.get('.crayons-story', { timeout: 10000 }).should('exist')
    cy.wait(1000)
    cy.get('.crayons-story').its('length').should('be.gte', 3)
  })
})
