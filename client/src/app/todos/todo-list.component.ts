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
export class TodoListComponent {
  public serverFilteredTodos: Todo[];
  public filteredTodos: Todo[];

  public todoOwner: string;
  public todoStatus: boolean;
  public todoBody: string;
  public todoCategory: string;
  public viewType: 'card' | 'list' = 'card';

  /**
   * Client-sided filtering is generally faster / more efficient than
   * server-sided filtering since it sends less requests to the server,
   * however, it is less secure than server-sided filtering because
   * client tampering is much easier.
   */
  updateFilter() {
  }

  getTodosFromServer() {
  }
}
