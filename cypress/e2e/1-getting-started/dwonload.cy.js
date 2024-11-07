/// <reference types="cypress" />


describe('example radio app', () => {


    it.only('check radio button', () => {
        cy.visit('https://practice.expandtesting.com/download')
        cy.contains('1726469705328_signature.png').click()
        const filePath ="cypress/downloads/1726469705328_signature.png";
        cy.readFile(filePath).should('exist')

    })

  })
  