describe('Input form', () => {
   beforeEach(() => {
    cy.seedAndVisit([])
   }) 

//    To test Input Text
    it('focuses input on load', () => {
        cy.focused()
        .should('have.class', 'new-todo')
    })

    it('accepts input', () => {
        const typeText = 'welcome'

        cy.get('.new-todo')
        .type(typeText)
        .should('have.value', typeText)
    })

    //  To test Form Submission 
    context('Form submission', () => {
        beforeEach(() => {
            cy.server()
        })

        it('Adds a new todo on submit', () => {
            const itemText ='Buy Eggs'
            cy.route('POST', '/api/todos', {
                name: itemText,
                id:'1',
                isComplete: false
            })
            cy.get('.new-todo')
            .type(itemText)
            .type('{enter}')
            .should('have.value', '')

            cy.get('.todo-list li')
            .should('have.length', 1)
            .and('contain', itemText)
        })

        // To test if we are getting error message
        it('Shows an error message on a failed submission', () => {
            cy.route({
              url: '/api/todos',
              method: 'POST',
              status: 500,
              response: {}
            })
      
            cy.get('.new-todo')
              .type('test{enter}')
      
            cy.get('.todo-list li')
              .should('not.exist')
      
            cy.get('.error')
              .should('be.visible')
          })
        })
      })