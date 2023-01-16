describe('Footer', () => {
    context('with a single todo',() => {
     it('display a singular todo in count', () => {
        cy.seedAndVisit([{id:1,name: 'buy Milk', isComplete: false}])
        cy.get('.todo-count')
        .should('contain', '1 todo left')
     })
    })

    context('with a multiple todos' ,() => {
        beforeEach (() => {
            cy.seedAndVisit()
        })

        it('display a plural todos in count', () => {
            cy.get('.todo-count')
            .should('contain', '3 todos left')
        })

        it.only('Filters to active todos',() => {
            cy.contains('Active')
            .click()
            
            cy.get('.todo-list li')
            .should('have.length', 3)
        } )
    })
})