describe('verify input fields', () => {

    it('verify intercept', () => {
            cy.intercept('GET', 'https://practice.expandtesting.com/slow').as('showExternal');
            cy.visit('https://practice.expandtesting.com/slow');
            cy.wait('@showExternal').then(() => {
                cy.alert('.alert-info').should('have.text', 'This slow task has finished. Thanks for waiting!')
            })
        }
    )

    it.only('work response', () => {
            cy.intercept('GET', 'https://practice.expandtesting.com/slow-external',
                {
                    statusCode: 200,
                    body: 'This slow task has not finished. Thanks for waiting!'
                }).as('mockApi');
            cy.visit('https://practice.expandtesting.com/slow');
            cy.wait('@mockApi').then(() => {
                cy.get('.alert-info').should('have.text', 'This slow task has not finished. Thanks for waiting!')
            })
        }
    )
})
