// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Command to fill in the horse odds and click the 'Calculate' button
Cypress.Commands.add('calculateOdds', (valueArray) => {

    // Iterate given array and insert values into the horse inputs 
    valueArray.forEach((horseValue, idx) => {
        cy.get(`#horse${idx+1}`).type(horseValue)
    })

    // Click Calculate to get results 
    cy.get('#calculate').click()
})