/// <reference types="cypress" />

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('react app', () => {

    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test
        cy.visit('https://practice.expandtesting.com/notes/app/login')
        cy.get('.btn-primary').click()
          cy.get('#email').type('bishal+1@nextlevelvalue.nl')
          cy.get('#password').type('Bishal@68')
          cy.get('.btn-primary').click()
      })

  
    // it('verify user gets logged in with valid credentials', () => {
    // cy.visit('https://practice.expandtesting.com/notes/app/login')
    // cy.get('.btn-primary').click()
    //   cy.get('#email').type('bishal+1@nextlevelvalue.nl')
    //   cy.get('#password').type('Bishal@68')
    //   cy.get('.btn-primary').click()
    // })

    it('click add notes', () => {
        cy.visit('https://practice.expandtesting.com/notes/app')
        cy.get('[data-testid="add-new-note"]').click()
        cy.get('.modal-title').should('have.text', 'Add new note')
        cy.get('#category').select('Home')
        cy.get('.form-check-label').click()
        cy.get('#title').type('Test')
    })
  })
  