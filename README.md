📌 Project Overview

This repository contains a complete automated test suite built with Cypress for validating key workflows on the DEV.to platform.

The framework is designed for:

Learning Cypress Automation
Real-world automation practice
API & UI validation
Data-driven testing
Portfolio & demonstration projects
🛠️ Tech Stack
Technology	Purpose
Cypress	End-to-End Testing
JavaScript	Test Scripting
Node.js	Runtime Environment
npm	Package Management
dotenv	Environment Variable Management
PapaParse	CSV Parsing
Cypress Image Snapshot	Visual Regression Testing
Allure Cypress Plugin	Reporting
📂 Folder Structure
.
├── cypress/
│   ├── e2e/
│   │   ├── 01_login.cy.js
│   │   ├── 02_search.cy.js
│   │   ├── 03_navigation.cy.js
│   │   ├── 04_api.cy.js
│   │   ├── 05_visual.cy.js
│   │   ├── 06_studio_generated.cy.js
│   │   └── 07_csv_driven.cy.js
│   │
│   ├── fixtures/
│   │   ├── users.json
│   │   ├── search_keywords.json
│   │   ├── form_data.json
│   │   └── test_data.csv
│   │
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│
├── cypress.config.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
✅ Test Coverage
🔐 Login Tests

📄 File:

cypress/e2e/01_login.cy.js
Covers
Valid login flow
Invalid login validation
Multiple invalid users from JSON fixture
Inline data-driven login tests
Token-based authentication helper
🔍 Search Tests

📄 File:

cypress/e2e/02_search.cy.js
Covers
Searching articles on DEV.to
Search query validation
Fixture-based keyword testing
Search page loading checks
🧭 Navigation Tests

📄 File:

cypress/e2e/03_navigation.cy.js
Covers
Page navigation
URL validation
Header visibility checks
Common DEV.to route testing
🌐 API Tests

📄 File:

cypress/e2e/04_api.cy.js
Covers
Mocking API responses using cy.intercept()
Spying on real API calls
Sending GET requests using cy.request()
Authenticated API request testing
Mock POST request validation
Fixture-based article payload testing
Optional real article creation via environment variables
🖼️ Visual Regression Tests

📄 File:

cypress/e2e/05_visual.cy.js
Covers
Screenshot comparison
Baseline image validation
Page-level visual checks using Cypress Image Snapshot
🎥 Cypress Studio Tests

📄 File:

cypress/e2e/06_studio_generated.cy.js
Covers
Cypress Studio generated flows
Recorded browser interactions
📊 CSV-Driven Tests

📄 File:

cypress/e2e/07_csv_driven.cy.js
Covers
Reading test data from CSV files
Data-driven execution
External test data management
⚡ Custom Commands

Custom Cypress commands are defined in:

cypress/support/commands.js
Available Commands
cy.visitDevTo()
cy.loginUI()
cy.loginWithToken()
cy.bypassLoginWithToken()
cy.searchFor()
cy.goTo()
cy.pageLoaded()

These commands improve:

Reusability
Maintainability
Readability
Cleaner test structure
🔐 Environment Variables

Sensitive values are stored securely using environment configuration.

Create .env
CYPRESS_PROJECT_ID=your_project_id
Create cypress.env.json
{
  "USER_EMAIL": "your_email@example.com",
  "USER_PASSWORD": "your_password",
  "AUTH_TOKEN": "your_devto_api_token",
  "CREATE_REAL_POST": false,
  "PUBLISH_REAL_POST": false
}
⚠️ Important Security Notes

✅ .env is ignored by Git
✅ cypress.env.json is ignored by Git

❌ Never push:

Passwords
Tokens
API Keys
Cypress Dashboard Keys
Private credentials
📦 Installation
Clone Repository
git clone YOUR_REPOSITORY_URL
cd YOUR_PROJECT_FOLDER
Install Dependencies
npm install
▶️ Running Tests
Open Cypress Test Runner
npm run cy:open
Run All Tests (Headless)
npm run cy:run
Run All Tests with Dashboard Recording
npm run cy:all
🎯 Run Specific Test Suites
Login Tests
npm run cy:login
Search Tests
npm run cy:search
Navigation Tests
npm run cy:nav
API Tests
npm run cy:api
Visual Regression Tests
npm run cy:visual
Cypress Studio Tests
npm run cy:studio
CSV-Driven Tests
npm run cy:csv
📜 npm Scripts
{
  "cy:open": "cypress open",
  "cy:run": "cypress run",
  "cy:login": "cypress run --spec 'cypress/e2e/01_login.cy.js'",
  "cy:search": "cypress run --spec 'cypress/e2e/02_search.cy.js'",
  "cy:nav": "cypress run --spec 'cypress/e2e/03_navigation.cy.js'",
  "cy:api": "cypress run --spec 'cypress/e2e/04_api.cy.js'",
  "cy:visual": "cypress run --spec 'cypress/e2e/05_visual.cy.js'",
  "cy:studio": "cypress run --spec 'cypress/e2e/06_studio_generated.cy.js'",
  "cy:csv": "cypress run --spec 'cypress/e2e/07_csv_driven.cy.js'",
  "cy:record": "cypress run --record",
  "cy:all": "cypress run --record"
}
📁 Fixtures

The framework uses fixture files to separate test data from test logic.

📂 Location:

cypress/fixtures/
Included Fixtures
File	Purpose
users.json	Login test users
search_keywords.json	Search test keywords
form_data.json	API/article payload data
test_data.csv	CSV-driven testing
🔒 Security & Git Ignore

This project excludes sensitive/generated files from GitHub.

Ignored Files
.env
cypress.env.json
node_modules/
cypress/videos/
cypress/screenshots/
cypress/downloads/
cypress/snapshots/
Before Pushing Code

Always verify:

git status

Do NOT commit:

API Tokens
Passwords
Email Credentials
Dashboard Keys
Generated Screenshots/Videos
node_modules
🖼️ Visual Testing Notes

Visual regression testing uses:

✅ Cypress Image Snapshot

Generated snapshots/screenshots/videos are ignored from Git to avoid:

Large repository size
Machine-specific artifacts
Unnecessary commits
⚠️ Real API Safety

The API suite can create a real DEV.to article, but it is disabled by default.

Enable Real Article Creation
{
  "CREATE_REAL_POST": true
}
Enable Real Publishing
{
  "PUBLISH_REAL_POST": true
}

⚠️ Keep both values as false unless intentionally testing real article creation.

⭐ Best Practices Followed

✅ Reusable Custom Commands
✅ Fixture-Based Data Management
✅ Secure Environment Configuration
✅ Organized Test Structure
✅ API Mocking & Validation
✅ Data-Driven Testing
✅ Visual Regression Testing
✅ Git Ignore Protection
✅ Locked Dependencies with package-lock.json

👨‍💻 Author
Umar Hassan
📄 License

This project is created for:

Educational Purposes
Learning Automation Testing
Demonstration & Practice
⭐ Support

If you found this project useful:

🌟 Star the repository
🍴 Fork the project
📢 Share with others

🚀 Happy Testing with Cypress!
