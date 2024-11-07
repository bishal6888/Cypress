/// <reference types="cypress" /

import { Note } from "../../pages/notepages.cy";

describe("Login to notes app", () => {
    const notespage = new Note()

    let users;
    let createNotes;
    let updateNotes;
    beforeEach(() => {
        cy.visit("https://practice.expandtesting.com/notes/app");
       cy.get(".btn-primary").click();

        cy.fixture('userDetails.json').then((user) => {
            users = user;
            //assertion
            cy.get(".col-lg-5").should("contains.text", "Login");

            cy.get("#email").type(users.email);
            cy.get("#password").type(users.password);
            cy.get("[data-testid=login-submit]").click();
        })

        cy.fixture('createData.json').then((createNote) => {
            createNotes = createNote;
        })

        cy.fixture('updateData.json').then((updateNote) => {
            updateNotes = updateNote;
        })

        // cy.get(".me-md-2").click();


    });

    it("Create a new note", {tags: 'smoke'},() => {
        notespage.ClickOnAddNotesButton()
        notespage.AddTitleformates(createNotes.title)
        notespage.AddDescriptionfornotes(createNotes.description)
        notespage.ClickOnCreateNotesButton()
    });

    it("edit a new note", {tags: 'smoke2'},() => {
        cy.wait(5000);
        notespage.ClickOnEditButton()
        notespage.AddTitleformates(updateNotes.title)
        notespage.AddDescriptionfornotes(createNotes.description)
        notespage.ClickOnSaveButton()
    });

    it("delete a note", () => {
        cy.wait(5000);
        notespage.ClickOnDeleteNoteButton()
        notespage.ClickOnConfirmDeleteButton()
    });
});
