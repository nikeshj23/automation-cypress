Cypress.Commands.add('seedAndVisit', (seedData ='fixture:todos') => {
    cy.server()
    cy.route('get','/api/todos',seedData )
    cy.visit('/')
})