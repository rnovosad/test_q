import {mainPage} from '../../selectors'

describe('Main test suite', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  describe('Verify presence of the elements', () => {
    it('Verify that app logo and header are displayed', () => {
      cy.get(mainPage.header.logo).should("be.visible")
      cy.get(mainPage.header.title).should("be.visible")
    })

    it('Verify cards footer buttons appearance and functionality when moving right', () => {
      const name = 'linda'
      cy.get(mainPage.columns.applied)
        .find(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.button(name).up).should("be.visible")
      cy.get(mainPage.container.button(name).down).should("not.be.visible")
      cy.get(mainPage.container.button(name).up).click()
      cy.get(mainPage.container.button(name).up).should("be.visible")
      cy.get(mainPage.container.button(name).down).should("be.visible")
      cy.get(mainPage.columns.applied)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.columns.interviewing)
        .find(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.columns.hired)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.container.button(name).up).click()
      cy.get(mainPage.container.button(name).up).should("not.be.visible")
      cy.get(mainPage.container.button(name).down).should("be.visible")
      cy.get(mainPage.columns.applied)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.columns.interviewing)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.columns.hired)
        .find(mainPage.container.name(name)).should("be.visible")
    });

    it('Verify cards footer buttons appearance and functionality when moving left', () => {
      const name = 'julia'
      cy.get(mainPage.columns.hired)
        .find(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.button(name).up).should("not.be.visible")
      cy.get(mainPage.container.button(name).down).should("be.visible")
      cy.get(mainPage.container.button(name).down).click()
      cy.get(mainPage.container.button(name).up).should("be.visible")
      cy.get(mainPage.container.button(name).down).should("be.visible")
      cy.get(mainPage.columns.applied)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.columns.hired)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.columns.interviewing)
        .find(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.button(name).down).click()
      cy.get(mainPage.container.button(name).down).should("not.be.visible")
      cy.get(mainPage.container.button(name).up).should("be.visible")
      cy.get(mainPage.columns.applied)
        .find(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.columns.interviewing)
        .find(mainPage.container.name(name)).should("not.be.visible")
      cy.get(mainPage.columns.hired)
        .find(mainPage.container.name(name)).should("not.be.visible")
    });
    it('Verify applicants name, photo and city is present on the card', () => {
      const name = 'lloyd'
      cy.get(mainPage.container.photo(name)).should("be.visible")
      cy.get(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.city(name)).should("be.visible")
    });
    it('Verify applicants name, photo and city is present on the card across all columns', () => {
      const name = 'emma'
      cy.get(mainPage.columns.applied)
        .find(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.photo(name)).should("be.visible")
      cy.get(mainPage.container.city(name)).should("be.visible")
      cy.get(mainPage.container.button(name).up).click()
      cy.get(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.photo(name)).should("be.visible")
      cy.get(mainPage.container.city(name)).should("be.visible")
      cy.get(mainPage.container.button(name).up).click()
      cy.get(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.container.city(name)).should("be.visible")
    });
  })

  describe('Verify filters functionality', () => {
    it('Verify that user is able to filter by name and clear selection', () => {
      const name = 'linda'
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.name).type(name)
      cy.get(mainPage.filters.button.submit).click()
      cy.get(mainPage.container.name()).should("have.length", 1)
      cy.get(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.filters.button.clear).click()
      cy.get(mainPage.container.name()).should("have.length", 5)
    });

    it('Verify that user is able to filter by city and clear selection', () => {
      const name = 'danielle'
      const city = 'cardiff'
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.city).type(city)
      cy.get(mainPage.filters.button.submit).click()
      cy.get(mainPage.container.name()).should("have.length", 1)
      cy.get(mainPage.container.name(name)).should("be.visible")
      cy.get(mainPage.filters.button.clear).click()
      cy.get(mainPage.container.name()).should("have.length", 5)
    });

    it('Verify that no elements are displayed when entered non existing value', () => {
      const name = 'denny'
      const city = 'oslo'
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.name).type(name)
      cy.get(mainPage.filters.button.submit).click()
      cy.get(mainPage.container.name()).should("have.length", 0)
      cy.get(mainPage.filters.button.clear).click()
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.name).clear()
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.city).type(city)
      cy.get(mainPage.filters.button.submit).click()
      cy.get(mainPage.container.name()).should("have.length", 0)
      cy.get(mainPage.filters.button.clear).click()
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.city).clear()
    });

    it('Verify that search works for city and name simultaneously', () => {
      const name = 'emma'
      const city = 'worcester'
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.name).type(name)
      cy.get(mainPage.filters.input.city).type(city)
      cy.get(mainPage.filters.button.submit).click()
      cy.get(mainPage.container.name()).should("have.length", 1)
      cy.get(mainPage.filters.button.clear).click()
      cy.get(mainPage.container.name()).should("have.length", 5)
    });

    it('Verify that no results are shown when either city or name is not correct', () => {
      const name = 'emma'
      const city = 'liverpool'
      cy.get(mainPage.container.name()).should("have.length", 5)
      cy.get(mainPage.filters.input.name).type(name)
      cy.get(mainPage.filters.input.city).type(city)
      cy.get(mainPage.filters.button.submit).click()
      cy.get(mainPage.container.name()).should("have.length", 0)
      cy.get(mainPage.filters.button.clear).click()
      cy.get(mainPage.container.name()).should("have.length", 5)
    });
  })
})
