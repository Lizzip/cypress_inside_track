// Command to generate 'length' amount of random integers between the min and max values (inclusive) and return as an array of strings
Cypress.Commands.add('randomNums', (min, max, length) => {
    let numArray = [];

    for(let i = 0; i < length; i++){
        numArray.push((Math.floor(Math.random() * (max - min + 1) + min)).toString());
    }

    return numArray;
})