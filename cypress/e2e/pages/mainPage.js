class MainPage {
    rows = 6;
    
    elements = {
        logoImg: () => cy.get('img[alt="Inside Track Logo"'),
        footer: () => cy.get('.row.center.footer'),
        calculateButton: () => cy.contains('#calculate', 'Calculate'),
        horseInput: num => cy.get(`#horse${num}`),
        summaryText: num => cy.get(`div[id="summary${num}"] h4`),
        allSummaryText: () => cy.get(`div*[id^="summary"] h4`)
    }

    ////////////
    // Getters
    ////////////
    
    title = () => cy.title();
    getLogoImg = () => this.elements.logoImg();
    getFooter = () => this.elements.footer();
    getHorseInput = num => this.elements.horseInput(num);
    getSummaryText = num => this.elements.summaryText(num);

    ////////////
    // Actions
    ////////////

    clickCalculate = () => this.elements.calculateButton().click();
    visit = () => cy.visit("insidetrack");

    // Iterate given array and insert values into the horse inputs 
    insertOdds = valueArray => {
        valueArray.forEach((horseValue, idx) => {
            this.getHorseInput(idx+1).type(horseValue);
        })
    }
}

module.exports = new MainPage();