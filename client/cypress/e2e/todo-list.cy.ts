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
    // Filter for owner 'Joe Biden'
    cy.get('[data-test=todoOwnerInput]').type('Joe Biden');
  });

  it('Should type something in the category filter and check that it returned correct elements', () => {
    // Filter for category 'state of the union'
    cy.get('[data-test=todoCategoryInput]').type('state of the union');
  });

  it('Should type something in the body filter and check that it returned correct elements', () => {
    // Filter for body 'Hand'
    cy.get('[data-test=todoBodyInput]').type('Hand');
  });

  it('Should select a status, switch the view, and check that it returned correct elements', () => {
    // Filter for status 'complete');
    page.selectStatus(true);

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

  // TODO: implement testing for checking the filtered results once we get the
  // filtering working. We should also do testing for changing the card/list view.
});
