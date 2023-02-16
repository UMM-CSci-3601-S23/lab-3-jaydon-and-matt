import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from './todo';
import { TodoService } from './todo.service';

/**
 * A component that displays a list of todos, either as a grid
 * of cards or as a vertical list.
 *
 * The component supports local filtering by X or X,
 * and remote filtering (i.e., filtering by the server) by
 * X and/or X.
 */
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;
  public viewType: 'card' | 'list' = 'card';

  /**
   * This constructor injects both an instance of `TodoService`
   * and an instance of `MatSnackBar` into this component.
   *
   * @param todoService the `UserService` used to get users from the server
   * @param snackBar the `MatSnackBar` used to display feedback
   */
  constructor(private todoService: TodoService, private snackBar: MatSnackBar) {
    // Nothing here – everything is in the injection parameters.
  }

  /**
   * Client-sided filtering is generally faster / more efficient than
   * server-sided filtering since it sends less requests to the server,
   * however, it is less secure than server-sided filtering because
   * client tampering is much easier.
   */
  updateFilter() {
    this.filteredTodos = this.todoService.filterTodos(
      this.serverFilteredTodos, { category: this.todoCategory, status: this.todoStatus }
    );
  }

  getTodosFromServer() {
    this.todoService.getTodos({
      owner: this.todoOwner,
      body: this.todoBody
    }).subscribe(returnedTodos => {
      //This inner function passed to `subscribe` will be called
      //when the `Observable` returned by `getUsers()` has one
      //or more values to return. `returnedUsers` will be the
      //name for the array of `Users` we got back from the
      //server.
      this.serverFilteredTodos = returnedTodos;
      this.updateFilter();
    }, err => {
      // If there was an error getting the users, log
      // the problem and display a message.
      console.error('We couldn\'t get the list of todos; the server might be down');
      this.snackBar.open(
        'Problem contacting the server – try again',
        'OK',
        // The message will disappear after 3 seconds.
        { duration: 3000 });
    });
  }

  /**
   * Starts an asynchronous operation to update the users list
   */
  ngOnInit(): void {
    this.getTodosFromServer();
  }
}
