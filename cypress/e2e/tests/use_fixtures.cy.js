/// <reference types="cypress" />

import mainPage from '../pages/mainPage'

describe('Test Inside Track using fixtured data', () => {

    before(function(){
        // Load the fixture data
        cy.fixture('odds_data.json').then(data => {
            this.odds = data
        })
    }) 

    beforeEach(() => {
        // Load up the Inside Track website before each test
        mainPage.visit()
    })
    
    describe('Run checks with unfavourable odds from fixtured data', () => {

        it('should display red text with accurate values when calculated with unfavourable_1 fixure data', function(){
            
            mainPage.insertOdds(this.odds.unfavourable_1)
            mainPage.clickCalculate()

            const expectedValues = ['31.39%', '20.93%', '15.7%', '12.56%', '10.46%', '8.97%']

            // Verify each summary has the expected value, class, and colour 
            expectedValues.forEach((val, idx) => {
                let summary = mainPage.getSummaryText(idx+1)
                summary.should('have.text', val)
                .and('have.class', 'text-danger')
                .and('have.css', 'color', 'rgb(169, 68, 66)')
            })
        })

        it('should display red text with accurate values when calculated with unfavourable_2 fixure data', function(){
            
            mainPage.insertOdds(this.odds.unfavourable_2)
            mainPage.clickCalculate()

            const expectedValues = ['14.29%', '19.05%', '14.29%', '19.05%', '14.29%', '19.05%']

            // Verify each summary has the expected value, class, and colour 
            expectedValues.forEach((val, idx) => {
                let summary = mainPage.getSummaryText(idx+1)
                summary.should('have.text', val)
                .and('have.class', 'text-danger')
                .and('have.css', 'color', 'rgb(169, 68, 66)')
            })
        })
    })

    describe('Run checks with favourable odds from fixtured data', () => {

        it('should display green text with accurate values when calculated with favourable_1 fixure data', function(){
            
            mainPage.insertOdds(this.odds.favourable_1)
            mainPage.clickCalculate()

            const expectedValues = ['11.08%', '9.38%', '17.42%', '24.38%', '20.32%', '17.42%']

            // Verify each summary has the expected value, class, and colour 
            expectedValues.forEach((val, idx) => {
                let summary = mainPage.getSummaryText(idx+1)
                summary.should('have.text', val)
                .and('have.class', 'text-success')
                .and('have.css', 'color', 'rgb(60, 118, 61)')
            })
        })

        it('should display green text with accurate values when calculated with favourable_2 fixure data', function(){
            
            mainPage.insertOdds(this.odds.favourable_2)
            mainPage.clickCalculate()

            const expectedValues = ['18.52%', '14.81%', '18.52%', '14.81%', '14.81%', '18.52%']

            // Verify each summary has the expected value, class, and colour 
            expectedValues.forEach((val, idx) => {
                let summary = mainPage.getSummaryText(idx+1)
                summary.should('have.text', val)
                .and('have.class', 'text-success')
                .and('have.css', 'color', 'rgb(60, 118, 61)')
            })
        })

    })

})