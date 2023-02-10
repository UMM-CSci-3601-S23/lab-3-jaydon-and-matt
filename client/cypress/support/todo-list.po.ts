export class TodoListPage {
  navigateTo() {
    return cy.visit('/todos');
  }

  getUrl() {
    return cy.url();
  }

  /**
   * Gets the title of the app when visiting the `/todos` page.
   *
   * @returns the value of the element with the ID `.todo-list-title`
   */
  getTodoTitle() {
    return cy.get('.todo-list-title');
  }

  /**
   * Get all the `.todo-list-item` DOM elements. This will
   * be empty if we're using the card view of the todos.
   *
   * @returns an iterable (`Cypress.Chainable`) containing all
   *   the `.user-list-item` DOM elements.
   */
  getTodoListItems() {
    return cy.get('.todo-nav-list .todo-list-item');
  }

  /**
   * Change the view of todos.
   *
   * @param viewType Which view type to change to: "card" or "list".
   */
  changeView(viewType: 'card' | 'list') {
    return cy.get(`[data-test=viewTypeRadio] mat-radio-button[value="${viewType}"]`).click();
  }

  /**
   * Selects a role to filter in the "Role" selector.
   *
   * @param value The role *value* to select, this is what's found in the mat-option "value" attribute.
   */
  selectRole(value: boolean) {
    // Find and click the drop down
    return cy.get('[data-test=todoStatusSelect]').click()
      // Select and click the desired value from the resulting menu
      .get(`mat-option[value="${value}"]`).click();
      // NOTE: THIS CHAINING MIGHT BE FRAGILE (due to a 'click' followed by a 'get')
  }
}
