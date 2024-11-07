/// <reference types="cypress" />


describe('test related tables', () => {


    it.only('verify CPU usage', () => {
        cy.wait(3000)

        let colIndex;
        cy.visit('https://practice.expandtesting.com/dynamic-table')
        cy.get('.table-striped thead th').contains('CPU').invoke('index').then((index) => {
            colIndex = index;
            cy.log(colIndex)

            cy.get('.table-striped tbody tr').contains('Chrome').parent('tr').find('>td').eq(colIndex).then(($cell) => {
                const cpuVlaue = $cell.text().trim();
                cy.get('#chrome-cpu').invoke("text").then((text) => {
                    const value =text.trim().split(':')[1].trim();
                    expect(value).to.equal(cpuVlaue);

                });
            });
    });

  });
});
  