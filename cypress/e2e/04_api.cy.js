describe('API Tests - Dev.to', () => {
  // Test case 1: Mock articles API response
  it('should intercept and mock the articles API', () => {
    cy.intercept('GET', '**/api/articles*', {
      statusCode: 200,
      body: [
        {
          id: 9999,
          title: 'Mocked Article Title',
          description: 'This is a mocked article.',
          tag_list: ['javascript'],
          user: { name: 'Mock User' },
        },
      ],
    }).as('getArticles')

    cy.visitDevTo('/')
    cy.window().then((win) => {
      win.fetch('/api/articles?per_page=1')
    })

    cy.wait('@getArticles').then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      expect(interception.response.body[0].title).to.eq('Mocked Article Title')
      cy.log('API intercepted and mocked successfully')
    })
  })

  // Test case 2: Spy on real articles API response
  it('should spy on the real articles API call', () => {
    cy.intercept('GET', '**/api/articles*').as('realArticles')
    cy.visitDevTo('/')
    cy.window().then((win) => {
      win.fetch('/api/articles?per_page=5&top=1')
    })

    cy.wait('@realArticles', { timeout: 10000 }).then((interception) => {
      expect(interception.response.statusCode).to.eq(200)
      const articles = interception.response.body
      expect(articles).to.have.length.greaterThan(0)
      cy.log(`Real API returned ${articles.length} articles`)
    })
  })

  // Test case 3: Send GET request to articles API
  it('should send a GET request to fetch articles', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}/articles`,
      qs: { per_page: 5, top: 1 },
    }).then((response) => {
      expect(response.status).to.eq(200)
      expect(response.body).to.have.length(5)
      expect(response.body[0]).to.have.property('title')
      cy.log(`API returned article: ${response.body[0].title}`)
    })
  })

  // Test case 4: Send authenticated request with API token
  it('should send authenticated API request using token', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env('API_URL')}/articles/me`,
      headers: {
        'api-key': Cypress.env('AUTH_TOKEN'),
      },
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(`Response status: ${response.status}`)
      expect([200, 401]).to.include(response.status)
    })
  })

  // Test case 5: Mock POST request payload
  it('should intercept a POST and verify payload', () => {
    cy.intercept('POST', '**/api/articles', (req) => {
      req.body.article.title = 'Intercepted Title'
      req.reply({ statusCode: 201, body: { id: 123, title: 'Intercepted Title' } })
    }).as('createArticle')

    cy.visitDevTo('/')
    cy.window().then((win) => {
      win.fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          article: {
            title: 'Test Post',
            body_markdown: 'Hello world',
            published: false,
          },
        }),
      })
    })

    cy.wait('@createArticle').then((interception) => {
      expect(interception.request.body.article.title).to.eq('Intercepted Title')
      expect(interception.response.statusCode).to.eq(201)
      expect(interception.response.body.title).to.eq('Intercepted Title')
    })
  })

  // Test case 6: Submit article form data from JSON fixture
  it('should submit article form data from fixture without creating real posts', () => {
    cy.intercept('POST', '**/api/articles', (req) => {
      req.reply({
        statusCode: 201,
        body: {
          id: 456,
          title: req.body.article.title,
          published: false,
        },
      })
    }).as('submitArticleForm')

    cy.visitDevTo('/')
    cy.fixture('form_data').then((articles) => {
      articles.forEach((article) => {
        cy.window().then((win) => {
          win.fetch('/api/articles', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              article: {
                title: article.title,
                body_markdown: article.content,
                tags: article.tags,
                published: false,
              },
            }),
          })
        })

        cy.wait('@submitArticleForm').then((interception) => {
          expect(interception.request.body.article.title).to.eq(article.title)
          expect(interception.response.statusCode).to.eq(201)
          expect(interception.response.body.published).to.eq(false)
        })
      })
    })
  })

  // Test case 7: Create a real article with API token
  it('should create a real DEV article when enabled by env', function () {
    if (Cypress.env('CREATE_REAL_POST') !== true) {
      this.skip()
    }

    cy.fixture('form_data').then((articles) => {
      const article = articles[0]
      const shouldPublish = Cypress.env('PUBLISH_REAL_POST') === true
      const title = `${article.title} - Cypress ${Date.now()}`

      cy.request({
        method: 'POST',
        url: `${Cypress.env('API_URL')}/articles`,
        headers: {
          'api-key': Cypress.env('AUTH_TOKEN'),
          'Content-Type': 'application/json',
        },
        body: {
          article: {
            title,
            body_markdown: article.content,
            tags: article.tags,
            published: shouldPublish,
          },
        },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(201)
        expect(response.body.title).to.eq(title)
        expect(response.body.published).to.eq(shouldPublish)
        cy.log(`Created real DEV article: ${response.body.url}`)
      })
    })
  })
})
