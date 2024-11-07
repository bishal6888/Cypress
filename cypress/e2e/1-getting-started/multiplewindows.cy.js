describe('verify input fields', () => {

    it.only('verify multiple tabs', () => {
            cy.visit('https://practice.expandtesting.com/windows')
            cy.get('.div.row>a').invoke('removeAttr', 'target').click()
            cy.get('h1').should('have.text', 'Example of a new window page for Automation Testing Practice')
        }


    )

    it.only('should display all 6 steps of the scientific method', () => {
        cy.visit('https://practice.expandtesting.com/windows')
        cy.clock()
        cy.get('#discoverScientificMethod').click()
        cy.tick(60000)
        cy.get('[data-testid-"step1"]').should('be.visible').and('contain', 'Step 1: Ask a Question')
        cy.get('[data-testid-"step2"]').should('be.visible').and('contain', 'Step 2: Do Background Research')
        cy.get('[data-testid-"step3"]').should('be.visible').and('contain', 'Step 3: Construct a Hypothesis')
        cy.get('[data-testid-"step4"]').should('be.visible').and('contain', 'Step 4: Test Your Hypothesis by Doing an Experiment')
        cy.get('[data-testid-"step5"]').should('be.visible').and('contain', 'Step 5: Analyze Your Data and Draw a Conclusion')
        cy.get('[data-testid-"step6"]').should('be.visible').and('contain', 'Step 6: Communicate Your Results')
        }
    )


}


)
