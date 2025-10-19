/// <reference types="cypress" />

describe('Test Inside Track', () => {

    beforeEach(() => {
        // Load up the Inside Track website before each test
        cy.visit('https://lizzip.net/insidetrack')
    })

    describe('Check the page is displaying correctly on load', () => {

        it('should have Inside Track as the page title', () => {
            cy.title().should('include', 'Inside Track: True Odds Calculator')
        })

        it('should display the Inside Track logo', () => {

            // The image should be visible and have completed loading
            cy.get('img[alt="Inside Track Logo"').should('be.visible').and('have.prop', 'complete', true)
        })

        it('should display the Github footer', () => {
            const footer = cy.get('.row.center.footer')

            // Should display the expected text
            footer.should('contain.text', 'Description on how this works and code can be found on GitHub')

            // Should have a link to Github
            footer.find('a').should('have.attr', 'href').and('eq', 'https://github.com/Lizzip/inside_track')
        })

        it('should default to empty inputs', () => {
            const numSummaries = 6

            // Check all horse inputs are empty on first page load
            for(let i = 1; i <= numSummaries; i++){
                cy.get(`#horse${i}`).should('have.value', '')
            }

            // Insert text into some of the horse inputs
            cy.get('#horse1').type('12')
            cy.get('#horse2').type('8')

            // Reload the page
            cy.reload()

            // Check the inputs are empty again
            cy.get('#horse1').should('have.value', '')
            cy.get('#horse2').should('have.value', '')
        })
    })

    describe('Check true odds are calculated and displaying correctly', () => {

        it('should display green text with accurate values when the odds are favourable', () => {
            
            // Call the calculateOdds command from support/commands.js 
            cy.calculateOdds(['4', '5', '10', '7', '7', '50'])

            // Verify results values are as expected
            cy.get('div[id="summary1"] h4').should('have.text', '27.5%')
            cy.get('div[id="summary2"] h4').should('have.text', '22.92%')
            cy.get('div[id="summary3"] h4').should('have.text', '12.5%')
            cy.get('div[id="summary4"] h4').should('have.text', '17.19%')
            cy.get('div[id="summary5"] h4').should('have.text', '17.19%')
            cy.get('div[id="summary6"] h4').should('have.text', '2.7%')

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

        it('should display red text with accurate values when the odds are unfavourable', () => {
            
            // Call the calculateOdds command from support/commands.js 
            cy.calculateOdds(['2', '3', '8', '4', '8', '12'])

            // Verify results values are as expected
            cy.get('div[id="summary1"] h4').should('have.text', '30.79%')
            cy.get('div[id="summary2"] h4').should('have.text', '23.1%')
            cy.get('div[id="summary3"] h4').should('have.text', '10.26%')
            cy.get('div[id="summary4"] h4').should('have.text', '18.48%')
            cy.get('div[id="summary5"] h4').should('have.text', '10.26%')
            cy.get('div[id="summary6"] h4').should('have.text', '7.11%')

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

    })

    describe('should show true odds totalling 100%', () => {

        // Function to generate 'length' amount of random integers between the min and max values (inclusive) and return as an array of strings
        const randomNums = (min, max, length) => {
            let numArray = []

            for(let i = 0; i < length; i++){
                numArray.push((Math.floor(Math.random() * (max - min + 1) + min)).toString())
            }

            return numArray
        }

        it('should show a total of 100% when favourable', () => {

            // Insert random values which will provide a favourable outcome 
            const min = 6, max = 15, length = 6
            cy.calculateOdds(randomNums(min, max, length))

            // Get all of the true odds results and sum them together
            let total = 0
            for(let i = 1; i <= length; i++){
                cy.get(`div[id="summary${i}"] h4`).invoke('text').then(txt => {

                    // Add the value of this element to the running total 
                    total += parseFloat(txt.slice(0,-1))

                    // On the final summary div check the total has added up to 100%
                    if(i == length){
                        cy.task('log', `total = ${total}`) // debugging
                        cy.wrap(Math.round(total)).should('eq', 100)
                    }
                })
            }
        })

        it('should show a total of 100% when not favourable', () => {

            // Insert random values which will provide an unfavourable outcome 
            const min = 2, max = 5, length = 6
            cy.calculateOdds(randomNums(min, max, length))

            // Get all of the true odds results and sum them together
            let total = 0
            for(let i = 1; i <= length; i++){
                cy.get(`div[id="summary${i}"] h4`).invoke('text').then(txt => {

                    // Add the value of this element to the running total 
                    total += parseFloat(txt.slice(0,-1))

                    // On the final summary div check the total has added up to 100%
                    if(i == length){
                        cy.wrap(Math.round(total)).should('eq', 100)
                    }
                })
            }
        })
    })
})