Cypress.Commands.add('login', () => {
    let email = Cypress.env('user_name');
    let password = Cypress.env('user_password');
    let baseUrl = Cypress.env('url');
    cy.session([email, password], () => {
        const credentials = {
            email: email,
            password: password
        }
        cy.request({
            method: 'POST',
            url: 'https://practice.expandtesting.com/notes/api/users/login',
            body: credentials,
            headers: {'Content-Type': 'application/json'}
        }).then((response) => {
            expect(response.status).to.eq(200);
            cy.window().then((window) => {
                window.localStorage.setItem('token', response.body.data.token)
            }).then(() => {
                cy.visit(baseUrl)
            })
        },{
            validate: () =>{
                expect(localStorage.getItem('token')).to.be.not.null;
            }
        })
    })
})
