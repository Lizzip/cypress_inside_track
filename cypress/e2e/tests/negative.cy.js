/// <reference types="cypress" />

import mainPage from '../pages/mainPage'

describe('Negative Testing', () => {

    beforeEach(() => {
        // Load up the Inside Track website before each test
        mainPage.visit()
    })


    it('should display an alert when I click Calculate and no odds have been entered', () => {
        
        // Check we have no odds entered
        for(let i = 1; i <= mainPage.rows; i++){
            mainPage.getHorseInput(i).should('have.value', '')
        }

        // Click Calculate
        mainPage.clickCalculate()

        // Verify the alert displays and with expected text
        cy.on('window:alert', alertText => {
            expect(alertText).to.equal("Incorrect or missing odds");
        })
    })

    it('should display an alert when I click Calculate and only some odds have been entered', () => {
        
        // Check we have no odds entered
        for(let i = 1; i <= mainPage.rows; i++){
            mainPage.getHorseInput(i).should('have.value', '')
        }

        // Enter some odds
        mainPage.getHorseInput(3).type('1')
        mainPage.getHorseInput(5).type('7')

        // Click Calculate
        mainPage.clickCalculate()

        // Verify the alert displays and with expected text
        cy.on('window:alert', alertText => {
            expect(alertText).to.equal("Incorrect or missing odds");
        })
    })

    it('should display an alert when I click Calculate and invalid odds have been entered', () => {
        
        // Check we have no odds entered
        for(let i = 1; i <= mainPage.rows; i++){
            mainPage.getHorseInput(i).should('have.value', '')
        }

        // Enter invalid odds
        mainPage.insertOdds(['ar4', 'khgfd5', 'wdhre', 'idhrsadf', '$$$', '!!!'])

        // Click Calculate
        mainPage.clickCalculate()

        // Verify the alert displays and with expected text
        cy.on('window:alert', alertText => {
            expect(alertText).to.equal("Incorrect or missing odds");
        })
    })

})