//Exporting variable to be able to access all locators from the one place
export const mainPage = {
  header: {
    logo: '[alt=logo]',
    title: 'h1.App-title'
  },
  filters: {
    input: {
      name: 'input#name',
      city: 'input#city'
    },
    button: {
      submit: '[data-test="btn-submit"]',
      clear: '[data-test="btn-clear"]'
    }
  },
  columns: {
    applied: '[data-test="column-applied"]',
    interviewing: '[data-test="column-interviewing"]',
    hired: '[data-test="column-hired"]'
  },
  container: {
    //creating dynamic locators which depends on
    name: (name: string = '') => `[data-test^="name-${name}"]`,
    photo: (name: string = '') => `[data-test^="photo-${name}"]`,
    city: (name: string = '') => `[data-test^="city-${name}"]`,
    toolbar: (name: string = '') => `[data-test^="toolbar-${name}"]`,
    button: (name: string = '') => ({
      up: `[data-test^="btn-up-${name}"]`,
      down: `[data-test^="btn-down-${name}"]`
    })

  }

};
