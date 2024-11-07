import { Note } from "../../pages/notepages.cy";

describe('login using command', () => {
    const notespage = new Note()
    beforeEach(() => {
        const baseUrl = 'https://practice.expandtesting.com/notes/app/login'
        cy.login()
        cy.visit(baseUrl)
    })

    it("Create a new note", {tags: 'smoke10'},() => {
        notespage.ClickOnAddNotesButton()
        notespage.AddTitleformates('note1')
        notespage.AddDescriptionfornotes('New Description')
        notespage.ClickOnCreateNotesButton()
    });

    it("edit a new note", {tags: 'smoke11'},() => {
        cy.wait(5000);
        notespage.ClickOnEditButton()
        notespage.AddTitleformates('noteseditor')
        notespage.AddDescriptionfornotes("Updated Description")
        notespage.ClickOnSaveButton()
    });

    it("delete a note", () => {
        cy.wait(5000);
        notespage.ClickOnDeleteNoteButton()
        notespage.ClickOnConfirmDeleteButton()
    });
})
