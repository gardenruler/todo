/// <reference types="cypress" />

describe('todo app', () => {
    beforeEach(() => {
         cy.visit('http://localhost:3000/')
      })

      it('TODO 정상렌더링 확인', () => {
          cy.contains('TODO').should('exist');
          cy.get('.todoInput').should('exist');
          cy.contains('+').should('exist');
      })

      it('버튼으로 새로운 할 일 추가하기', ()=>{
        cy.wait(500)
        const newTodo = 'Cypress study';
        cy.get('.todoInput').type(newTodo);
        cy.contains('+').click();
        cy.get('.listWrapper')
        .should('exist', newTodo);
      })

      it('엔터로 새로운 할 일 추가하기', ()=>{
        cy.wait(500)
        const newTodo = 'feed the cat';
        cy.get('.todoInput').type(`${newTodo}{enter}`);
        cy.get('.listWrapper')
        .should('exist', newTodo);
      })

      it('할 일 완료시키기', ()=>{
        cy.contains('feed the cat')
        .parent()
        .find('.toggle')
        .click()

        cy.contains('feed the cat')
        .parent('li')
        .should('have.class', 'done')
      })

      it('할 일 삭제하기', ()=>{
        cy.contains('feed the cat')
        .parent()
        .find('.delete')
        .click()
        cy.contains('feed the cat').should('not.exist')

      })
      
      it('할 일 수정하고 삭제하기', ()=>{
        cy.contains('Cypress study')
        .parent()
        .find('[data-testid=edit]')
        .click()

        const editTodo = 'work out'

        cy.get('[data-testid=editInput]').type(`{selectall} {backspace} ${editTodo}`);
        cy.get('[data-testid=saveButton]').click();
        cy.get('.listWrapper')
        .should('exist', editTodo);

        cy.contains(editTodo)
        .parent()
        .find('.delete')
        .click()

        cy.contains(editTodo).should('not.exist')

      })
    
});