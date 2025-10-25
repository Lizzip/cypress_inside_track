const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
            console.log(message)
            return null
        }
      })
    },
    baseUrl: "https://lizzip.net/",
  },
});
