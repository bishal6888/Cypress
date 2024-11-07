/// <reference types="cypress" />


describe('example radio app', () => {


    it.only('check radio button', () => {
        cy.visit('https://practice.expandtesting.com/radio-buttons')
        cy.get('.card-header').contains('Select your favorite color:').find('~div.card-body #red').check()
        cy.get('.card-header').contains('Select your favorite sport:').find('~div.card-body #Football').check()
    })

  })
  