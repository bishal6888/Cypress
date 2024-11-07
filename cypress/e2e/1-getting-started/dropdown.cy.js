/// <reference types="cypress" />


describe('example radio app', () => {


    it.only('check radio button', () => {
        cy.visit('https://practice.expandtesting.com/dropdown')
        cy.get('#dropdown').select('Option 2')
        cy.get('.form-control').select('50')
        cy.get('#country').select('Nepal')
    })

  })
  