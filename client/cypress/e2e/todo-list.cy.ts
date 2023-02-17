import { TodoListPage } from '../support/todo-list.po';

const page = new TodoListPage();

describe('Todo list', () => {

  beforeEach(() => {
    page.navigateTo();
  });

  it('Should have the correct title', () => {
    page.getTodoTitle().should('have.text', 'Todos');
  });

  it('Should type something in the owner filter and check that it returned correct elements', () => {
    // Filter for owner 'Fry'
    cy.get('[data-test=todoOwnerInput]').type('fry');

    // All of the todo cards should have the owner we are filtering by
    page.getTodoCards().each($card => {
      cy.wrap($card).find('.todo-card-owner').should('have.text', 'Fry');
    });
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'software development'
    cy.get('[data-test=todoCategoryInput]').type('soft');
    page.changeView('list');
    // Each todo list's category name should include the text we are filtering by
    page.getTodoListItems().each(e => {
      cy.wrap(e).find('.todo-list-category').should('have.text', ' software design ');
    });
  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for body 'qui'
    cy.get('[data-test=todoBodyInput]').type('qui');
    page.changeView('list');
    page.getTodoListItems().each(e => {
      cy.wrap(e).find('.todo-list-body').contains('qui', {matchCase: false});
    });
  });

  it('Should select a status and check that it returned correct elements', () => {
    // Filter for status 'complete');
    page.selectStatus('complete');

    // All of the todo cards should have the status we are filtering by
    page.getTodoCards().each($card => {
      cy.wrap($card).find('.todo-card-status').should('have.text', 'Complete');
    });
  });

  it('Should limit the number of todos displayed', () => {
    // Filter for a limit of 3 todos
    cy.get('[data-test=todoLimitInput]').type('3');

    page.getTodoCards().should('have.lengthOf', 3);

    // Go through each of the cards that are being shown and get the names
    page.getTodoCards().find('.todo-card-owner')
      // We should see only the first 3 todo cards
      .should('contain.text', 'Blanche')
      .should('contain.text', 'Fry')
      .should('contain.text', 'Fry');

      // And these should be the only cards that show up on the page.
      page.getTodoCards().should('have.lengthOf', 3);
  });

  it('Should change the view', () => {
        // Choose the view type "Card"
        page.changeView('card');

        // There should be cards
        // We should not see any list items
        page.getTodoCards().should('exist');
        page.getTodoListItems().should('not.exist');

        // Choose the view type "List"
        page.changeView('list');

        // There should be a list
        // We should not see any card items
        page.getTodoCards().should('not.exist');
        page.getTodoListItems().should('exist');
  });

});
