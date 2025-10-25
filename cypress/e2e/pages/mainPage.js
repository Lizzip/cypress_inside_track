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

    // Getters
    title = () => cy.title();
    getLogoImg = () => this.elements.logoImg();
    getFooter = () => this.elements.footer();
    getHorseInput = num => this.elements.horseInput(num);
    getSummaryText = num => this.elements.summaryText(num);

    getAllSummaryText = () => {
        let summaries = [];

        for(let i = 1; i <= this.rows; i++){
            summaries.push(this.getSummaryText(i));
        }

        return summaries;
    }

    getAllHorseInputs = () => {
        let inputs = [];

        for(let i = 1; i <= this.rows; i++){
            inputs.push(this.getHorseInput(i));
        }

        return inputs;
    }

    // Actions
    clickCalculate = () => this.elements.calculateButton().click();

    visit = () => {
        cy.visit("insidetrack");
    }

    // Iterate given array and insert values into the horse inputs 
    insertOdds = valueArray => {
        valueArray.forEach((horseValue, idx) => {
            this.getHorseInput(idx+1).type(horseValue);
        })
    }

    // Iterate given array and check all summary text matches the array values
    verifyResultsText = valueArray => {
        valueArray.forEach((summaryValue, idx) => {
            this.getSummaryText(idx+1).should('have.text', summaryValue);
        })
    }

    // Iterate all summary texts converting them into numerical values and summing them, then verify the sum is as expected
    verifySumOfSummaryText = (expectedSum) => {

        let total = 0;
        const summaries = this.getAllSummaryText();

        summaries.forEach((summary, idx) => {
            summary.invoke('text').then(txt => {
                total += parseFloat(txt.slice(0,-1))

                if(idx + 1 == summaries.length){
                     cy.wrap(Math.round(total)).should('eq', expectedSum)
                 }
            })
        })
    }

}

module.exports = new MainPage();