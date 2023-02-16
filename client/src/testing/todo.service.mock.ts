import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../app/todos/todo';
import { TodoService } from '../app/todos/todo.service';

/**
 * A "mock" version of the `TodoService` that can be used to test components
 * without having to create an actual service. It needs to be `Injectable` since
 * that's how services are typically provided to components.
 */
@Injectable()
export class MockTodoService extends TodoService {
  static testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      status: true,
      body: 'go to mcdonald\'s',
      category: 'food'
    },
    {
      _id: 'bob_id',
      owner: 'Bob',
      status: false,
      body: 'go to burger king',
      category: 'food'
    },
    {
      _id: 'jane_id',
      owner: 'Jane',
      status: true,
      body: 'do math',
      category: 'homework'
    },
    {
      _id: 'sarah_id',
      owner: 'Sarah',
      status: false,
      body: 'do english',
      category: 'homework'
    },
  ];

  constructor() {
    super(null);
  }

  getTodos(): Observable<Todo[]> {
    // Our goal here isn't to test (and thus rewrite) the service, so we'll
    // keep it simple and just return the test users regardless of what
    // filters are passed in.
    //
    // The `of()` function converts a regular object or value into an
    // `Observable` of that object or value.
    return of(MockTodoService.testTodos);
  }

  getTodoById(id: string): Observable<Todo> {
    // If the specified ID is for the first test todo,
    // return that todo, otherwise return `null` so
    // we can test illegal todo requests.
    if (id === MockTodoService.testTodos[0]._id) {
      return of(MockTodoService.testTodos[0]);
    } else {
      return of(null);
    }
  }

}
