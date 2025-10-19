/// <reference types="cypress" />

describe('Test Inside Track using fixtured data', () => {

    before(function(){
        // Load the fixture data
        cy.fixture('odds_data.json').then(data => {
            this.odds = data
        })
    })

    beforeEach(() => {
        // Load up the Inside Track website before each test
        cy.visit('https://lizzip.net/insidetrack')
    })
    
    describe('Run checks with unfavourable odds from fixtured data', () => {

        it('should display red text with accurate values when calculated with unfavourable_1 fixure data', function(){
            
            // Call the calculateOdds command from support/commands.js 
            cy.calculateOdds(this.odds.unfavourable_1)

            // Verify results values are as expected
            cy.get('div[id="summary1"] h4').should('have.text', '31.39%')
            cy.get('div[id="summary2"] h4').should('have.text', '20.93%')
            cy.get('div[id="summary3"] h4').should('have.text', '15.7%')
            cy.get('div[id="summary4"] h4').should('have.text', '12.56%')
            cy.get('div[id="summary5"] h4').should('have.text', '10.46%')
            cy.get('div[id="summary6"] h4').should('have.text', '8.97%')

            // Check text has danger class
            const numSummaries = 6
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.class', 'text-danger')
            }

            // Check text is red
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.css', 'color', 'rgb(169, 68, 66)')
            }
        })

        it('should display red text with accurate values when calculated with unfavourable_2 fixure data', function(){
            
            // Call the calculateOdds command from support/commands.js 
            cy.calculateOdds(this.odds.unfavourable_2)

            // Verify results values are as expected (this is alternating so we can use mod)
            const numSummaries = 6
            for(let i = 1; i <= numSummaries; i++){
                if(i % 2){
                    cy.get(`div[id="summary${i}"] h4`).should('have.text', '14.29%')
                }
                else {
                    cy.get(`div[id="summary${i}"] h4`).should('have.text', '19.05%')
                }
            }

            // Check text has danger class
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.class', 'text-danger')
            }

            // Check text is red
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.css', 'color', 'rgb(169, 68, 66)')
            }
        })

    })

    describe('Run checks with favourable odds from fixtured data', () => {

        it('should display green text with accurate values when calculated with favourable_1 fixure data', function(){
            
            // Call the calculateOdds command from support/commands.js 
            cy.calculateOdds(this.odds.favourable_1)

            // Verify results values are as expected
            cy.get('div[id="summary1"] h4').should('have.text', '11.08%')
            cy.get('div[id="summary2"] h4').should('have.text', '9.38%')
            cy.get('div[id="summary3"] h4').should('have.text', '17.42%')
            cy.get('div[id="summary4"] h4').should('have.text', '24.38%')
            cy.get('div[id="summary5"] h4').should('have.text', '20.32%')
            cy.get('div[id="summary6"] h4').should('have.text', '17.42%')

            // Check text has success class
            const numSummaries = 6
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.class', 'text-success')
            }

            // Check text is green
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.css', 'color', 'rgb(60, 118, 61)')
            }
        })

        it('should display green text with accurate values when calculated with favourable_2 fixure data', function(){
            
            // Call the calculateOdds command from support/commands.js 
            cy.calculateOdds(this.odds.favourable_2)

            // Verify results values are as expected
            cy.get('div[id="summary1"] h4').should('have.text', '18.52%')
            cy.get('div[id="summary2"] h4').should('have.text', '14.81%')
            cy.get('div[id="summary3"] h4').should('have.text', '18.52%')
            cy.get('div[id="summary4"] h4').should('have.text', '14.81%')
            cy.get('div[id="summary5"] h4').should('have.text', '14.81%')
            cy.get('div[id="summary6"] h4').should('have.text', '18.52%')

            // Check text has success class
            const numSummaries = 6
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.class', 'text-success')
            }

            // Check text is green
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`div[id="summary${i}"] h4`).should('have.css', 'color', 'rgb(60, 118, 61)')
            }
        })

    })

})