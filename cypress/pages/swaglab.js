export class SwagLab {
    login(username, password) {
        cy.log(`Logging in with username: ${username}`);
        cy.get("#user-name").type(username);
        cy.get("#password").type(password);
        cy.get("#login-button").click();
    }

    logout() {
        cy.get("#react-burger-menu-btn").click();
        cy.get("#logout_sidebar_link").click();
        cy.url().should("eq", "https://www.saucedemo.com/");
    }

    /**
     * Sorts the products by the given type. The default type is name_asc.
     * @param {string} [type="name_asc"] - The type of sorting. Possible values are name_asc, name_desc, price_asc, price_desc.
     */
    sortProducts(type = "name_asc") {
        switch (type) {
            case "name_asc":
                cy.get("select")
                    .select("Name (A to Z)")
                    .should("have.value", "az");
                cy.get(".inventory_item")
                    .should("have.length.gt", 0)
                    .then((products) => {
                        const productNames = products.map((index, item) =>
                            Cypress.$(item).find(".inventory_item_name").text()
                        );
                        const sortedNames = [...productNames].sort();
                        expect(productNames.get()).to.deep.equal(sortedNames);
                    });
                break;
            case "name_desc":
                cy.get("select")
                    .select("Name (Z to A)")
                    .should("have.value", "za");
                cy.get(".inventory_item")
                    .should("have.length.gt", 0)
                    .then((products) => {
                        const productNames = products.map((index, item) =>
                            Cypress.$(item).find(".inventory_item_name").text()
                        );
                        const sortedNames = [...productNames].sort().reverse();
                        expect(productNames.get()).to.deep.equal(sortedNames);
                    });
                break;
            case "price_asc":
                cy.get("select")
                    .select("Price (low to high)")
                    .should("have.value", "lohi");
                cy.get(".inventory_item")
                    .should("have.length.gt", 0)
                    .then((products) => {
                        const productPrices = products.map((index, item) =>
                            Cypress.$(item).find(".inventory_item_price").text()
                        );
                        const sortedPrices = [...productPrices].sort(
                            (a, b) => b - a
                        );
                        expect(productPrices.get()).to.deep.equal(sortedPrices);
                    });
                break;
            case "price_desc":
                cy.get("select")
                    .select("Price (high to low)")
                    .should("have.value", "hilo");
                cy.get(".inventory_item")
                    .should("have.length.gt", 0)
                    .then((products) => {
                        const productPrices = products.map((index, item) =>
                            Cypress.$(item).find(".inventory_item_price").text()
                        );
                        const sortedPrices = [...productPrices].sort(
                            (a, b) => a - b
                        );
                        expect(productPrices.get()).to.deep.equal(sortedPrices);
                    });
                break;
            default:
                cy.get("select")
                    .select("Name (A to Z)")
                    .should("have.value", "az");
                cy.get(".inventory_item")
                    .should("have.length.gt", 0)
                    .then((products) => {
                        const productNames = products.map((index, item) =>
                            Cypress.$(item).find(".inventory_item_name").text()
                        );
                        const sortedNames = [...productNames].sort();
                        expect(productNames.get()).to.deep.equal(sortedNames);
                    });
                break;
        }
    }
}
