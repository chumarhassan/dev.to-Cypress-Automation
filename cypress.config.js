const { defineConfig } = require('cypress')
const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin')
require('dotenv').config()

module.exports = defineConfig({
  ...(process.env.CYPRESS_PROJECT_ID ? { projectId: process.env.CYPRESS_PROJECT_ID } : {}),

  e2e: {
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: true,
    screenshotOnRunFailure: true,
    experimentalStudio: true,

    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
      return config
    },
  },

  env: {
    BASE_URL: 'https://dev.to',
    API_URL: 'https://dev.to/api',
    USER_EMAIL: 'your_email@example.com',
    USER_PASSWORD: 'your_password',
    AUTH_TOKEN: 'your_api_token_here',
    CREATE_REAL_POST: false,
    PUBLISH_REAL_POST: false,
  },
})
