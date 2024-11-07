export class Note {
    addNoteButton = ".btn-primary";
    title = "#title";
    description = "#description";
    deleteCard = "div.row div.card";
    confirmdelete = ".btn-danger";
    editNotesButton = ".btn";

    ClickOnAddNotesButton = () => {
        cy.get(this.addNoteButton).contains("Add Note").click();
    };

    AddTitleformates = (notetitle) => {
        cy.get(this.title).clear().type(notetitle);
    };

    AddDescriptionfornotes = (notedescription) => {
        cy.get(this.description).clear().type(notedescription);
    };

    ClickOnCreateNotesButton = () => {
        cy.get(this.addNoteButton).contains("Create").click();
    };
    ClickOnDeleteNoteButton = () => {
        cy.get(this.deleteCard).contains("Delete").click();
    };
    ClickOnConfirmDeleteButton = () => {
        cy.get(this.confirmdelete).contains("Delete").click({ force: true });
    };
    ClickOnEditButton = () => {
        cy.get(this.editNotesButton).contains("Edit").click({ force: true });
    };
    ClickOnSaveButton = () => {
        cy.get(this.editNotesButton).contains("Save").click({ force: true });
    };
}
