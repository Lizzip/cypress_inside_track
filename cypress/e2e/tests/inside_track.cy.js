/// <reference types="cypress" />

import mainPage from '../pages/main_page'

describe('Test Inside Track', () => {

    beforeEach(() => {
        // Load up the Inside Track website before each test
        mainPage.visit()
    })

    describe('Check the page is displaying correctly on load', () => {

        it('should have Inside Track as the page title', () => {
            mainPage.title().should('include', 'Inside Track: True Odds Calculator')
        })

        it('should display the Inside Track logo', () => {

            // The image should be visible and have completed loading
            mainPage.getLogoImg().should('be.visible').and('have.prop', 'complete', true)
        })

        it('should display the Github footer', () => {
            const footer = mainPage.getFooter()

            // Should display the expected text
            footer.should('contain.text', 'Description on how this works and code can be found on GitHub')

            // Should have a link to Github
            footer.find('a').should('have.attr', 'href').and('eq', 'https://github.com/Lizzip/inside_track')
        })

        it('should default to empty inputs', () => {

            // Check all horse inputs are empty on first page load
            for(let i = 1; i <= mainPage.rows; i++){
                mainPage.getHorseInput(i).should('have.value', '')
            }

            // Insert text into some of the horse inputs
            mainPage.getHorseInput(1).type('12')
            mainPage.getHorseInput(2).type('8')

            // Reload the page
            cy.reload()

            // Check the inputs are empty again
            mainPage.getHorseInput(1).should('have.value', '')
            mainPage.getHorseInput(2).should('have.value', '')
        })
    })

    describe('Check true odds are calculated and displaying correctly', () => {

        it('should display green text with accurate values when the odds are favourable', () => {
            
            // Insert values into all horse inputs 
            mainPage.insertOdds(['4', '5', '10', '7', '7', '50'])
            mainPage.clickCalculate()

            const expectedValues = ['27.5%', '22.92%', '12.5%', '17.19%', '17.19%', '2.7%']
            
            // Verify each summary has the expected value, class, and colour 
            expectedValues.forEach((val, idx) => {
                let summary = mainPage.getSummaryText(idx+1)
                summary.should('have.text', val)
                .and('have.class', 'text-success')
                .and('have.css', 'color', 'rgb(60, 118, 61)')
            })
        })

        it('should display red text with accurate values when the odds are unfavourable', () => {
            
            // Insert values into all horse inputs 
            mainPage.insertOdds(['2', '3', '8', '4', '8', '12'])
            mainPage.clickCalculate()

            const expectedValues = ['30.79%', '23.1%', '10.26%', '18.48%', '10.26%', '7.11%']
            
            // Verify each summary has the expected value, class, and colour 
            expectedValues.forEach((val, idx) => {
                let summary = mainPage.getSummaryText(idx+1)
                summary.should('have.text', val)
                .and('have.class', 'text-danger')
                .and('have.css', 'color', 'rgb(169, 68, 66)')
            })
        })

    })

    describe('Check true odds total 100% when summed', () => {

        it('should show a total of 100% when favourable', () => {

            // Insert random values which will provide a favourable outcome 
            const min = 6, max = 15, length = 6
            cy.randomNums(min, max, length).then(randomOdds => {

                // Insert the random values into all horse inputs 
                mainPage.insertOdds(randomOdds)
                mainPage.clickCalculate()

                // Expect the total sum of the summary values to be 100
                let total = 0;

                for(let i = 1; i <= mainPage.rows; i++){
                    mainPage.getSummaryText(i).invoke('text').then(txt => {
                        total += parseFloat(txt.slice(0,-1))

                        if(i == mainPage.rows){
                            cy.wrap(Math.round(total)).should('eq', 100)
                        }
                    })
                }
            })
        })

        it('should show a total of 100% when not favourable', () => {

            // Insert random values which will provide an unfavourable outcome 
            const min = 2, max = 5, length = 6
            cy.randomNums(min, max, length).then(randomOdds => {

                // Insert the random values into all horse inputs 
                mainPage.insertOdds(randomOdds)
                mainPage.clickCalculate()

                // Expect the total sum of the summary values to be 100
                let total = 0;

                for(let i = 1; i <= mainPage.rows; i++){
                    mainPage.getSummaryText(i).invoke('text').then(txt => {
                        total += parseFloat(txt.slice(0,-1))

                        if(i == mainPage.rows){
                            cy.wrap(Math.round(total)).should('eq', 100)
                        }
                    })
                }
            })
        })
    })
})