# UI Automation Testing of Inside Track using Cypress 
## Overview
This project is a UI-level test automation suite for [https://lizzip.net/insidetrack](https://lizzip.net/insidetrack) created using [https://www.cypress.io/](Cypress), JavaScript, Mochawesome, and ESLint.
This is the first project I have created using Cypress, so while learning the tool I have cherry-picked which elements and practices are included. The main elements/practices I have encorporated where possible are: 
- End To End Testing
- Page Object Model 
- Cross-browser Testing 
- Data/Fixture Driven Testing 
- User-centric Locators
- Custom Commands
- Success/Fail HTML reports with Mochawesome and Cypress screenshots on failure 
  
    
## Installation 
This test pack requires NodeJS to be installed 
- NodeJS can be installed from [https://nodejs.org/](https://nodejs.org/)
- Once NodeJS is installed all other requirements can be installed with `npm install`  
  
  
## Usage
The tests can either be run using the default Cypress commands `npx cypress open` and `npx cypress run` or with the following commands: 
- `npm run cypress` to open the Cypress UI
- `npm run tests` to run all tests on the command line in the Chrome browser
- `npm run fixture-tests` to run only the tests using fixtures on the command line in the Chrome browser
- `npm run negative-tests` to run only the negative tests on the command line in the Chrome browser
- `npm run tests-electron` to run all tests on the command line in the Electron browser
- `npm run tests-firefox` to run all tests on the command line in the Firefox browser
- `npm run tests-edge` to run all tests on the command line in the Edge browser
- `npm run tests-min` to run all tests on the command line in the Chrome browser with no reporting and minimum console display
- `npm run merge-reports` to merge all reports created with Mochawesome into a single report   
  
  
## Project Structure
```
cypress_inside_track/
│
├── cypress/
│   ├── downloads/                              → Files downloaded during tests, cleared at the beginning of each test run
│   │
│   ├── e2e/
│   │   ├── pages/
|   |   |   └── main_page.js                    → Page Object Model for the main page of Inside Track 
|   |   | 
│   │   └── tests/
│   │       ├── inside_track.cy.js              → Main E2E tests for Inside Track 
│   │       ├── negative.cy.js                  → Negative E2E tests
│   │       └── use_fixtures.cy.js              → E2E tests using fixtured data
│   │
│   ├── fixtures/
│   │   └── odds_data.json                      → Test data for use in fixtured tests
│   │
│   ├── screenshots/                            → Screenshots taken during test runs
│   │
│   └── support/
│       ├── commands.js                         → Custom commands used during test runs 
│       └── e2e.js                              → Loads the custom commands before every spec file is run
│
├── mochawesome-report/
│   ├── assets/                                 → Assests required to display Mochawesome reports
│   ├── report-[name]-[state]-[datetime].json   → Generated Mochawesome reports per test spec per test run
│   └── merged-reports.json                     → Mochawesome merged report using mochawesome-merge
│
├── node_modules/                               → Node installed module libraries               
│
├── cypress.config.js                           → Cypress configuration file
├── eslint.config.mjs                           → ESLint configuration file
├── package-lock.json                           → Generated tree of installed packages by Node
├── package.json                                → Details, commands, and requirements of this framework 
└── README.md                                   → Documentation
```
  
  
## Future Enhancements 
As mentioned previously this is my first go using Cypress and is testing a very simple app, so it didn't make sense to try everything the framework can offer at this stage. In the future I would like to add the following:

- Cucumber / BDD style testing
- Docker integration
  - A Dockerfile to allow the tests to run within a Docker container
  - A Docker Compose file to allow cross-browser testing across multiple Docker containers  
- CI/CD Integration
  - Either Jenkins or Github Actions
- Coverage Reports
