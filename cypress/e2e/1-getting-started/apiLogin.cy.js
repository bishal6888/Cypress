import { Note } from "../../pages/notepages.cy";

describe('api login', () => {

    const notespage = new Note()
    const noteId = null;
    beforeEach(() => {
        const credentials = {
            email: 'bishal+1@nextlevelvalue.nl',
            password: 'Bishal@68'
        }
        cy.request({
            method: 'POST',
            url: 'https://practice.expandtesting.com/notes/api/users/login',
            body: credentials,
            headers: {'Content-Type': 'application/json'}
    })
            .then((response) => {
                expect(response.status).to.eq(200);
                cy.window().then((window) => {
                    window.localStorage.setItem('token', response.body.data.token)
                }).then(() => {
                    cy.visit('https://practice.expandtesting.com/notes/app')
                })
            })
    })

    it('Create a new note', () => {
        const addnotesbody = {
            title: 'note1',
            description: 'New Description',
            category: "Home",
            completed: false
        }
    const token = window.localStorage.getItem('token')
    cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/notes',
        body: addnotesbody,
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
        }
    }).then((response) => {
        expect(response.status).to.eq(200);
        const noteId = response.body.data.id;


        cy.wait(5000)
        notespage.ClickOnEditButton()
        notespage.AddTitleformates('noteseditor')
        notespage.AddDescriptionfornotes('Updated Description')
        notespage.ClickOnSaveButton()

        cy.request({
            method: 'DELETE',
            url: 'https://practice.expandtesting.com/notes/api/notes/' + noteId,
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
    })
})

