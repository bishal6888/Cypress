describe('shadow', () => {

    it('shadow dom', () => {
        cy.visit('https://practice.expandtesting.com/shadowdom')
        cy.get('#shadow-host').shadow().find('#my-btn').should('have.text', 'This button is inside a Shadow DOM.')
    })
}
)
