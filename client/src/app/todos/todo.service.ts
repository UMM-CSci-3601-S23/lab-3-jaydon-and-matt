import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  // The URL for the users part of the server API.
  readonly todoUrl: string = environment.apiUrl + 'todos'; // /api/todos , sent to the Server

  constructor(private httpClient: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    // TODO: support filtering the todos by its properties... we will do this with an httpParams map

    // `HttpParams` is essentially just a map used to hold key-value
    // pairs that are then encoded as "?key1=value1&key2=value2&…" in
    // the URL when we make the call to `.get()` below.

    // Send the HTTP GET request with the given URL and parameters.
    // That will return the desired `Observable<User[]>`.
    return this.httpClient.get<Todo[]>(this.todoUrl, { // /api/users/{parameters here}
    });
  }

  getTodoById(id: string): Observable<Todo> {
    return this.httpClient.get<Todo>(this.todoUrl + '/' + id);
  }

  /**
   * A service method that filters an array of `Todo` using
   * the specified filters.
   *
   * Note that the filters here support partial matches. Since the
   * matching is done locally we can afford to repeatedly look for
   * partial matches instead of waiting until we have a full string
   * to match against.
   *
   * @param todos the array of `Todos` that we're filtering
   * @param filters the map of key-value pairs used for the filtering
   * @returns an array of `Todos` matching the given filters
   */
  filterTodos(todos: Todo[]): Todo[] {
    const filteredTodos = todos;
    // TODO: allow filtering on the client side (use the methods below as a template). filteredTodos won't be a constant
    /*if (filters.name) {
      filters.name = filters.name.toLowerCase();
      filteredTodos = filteredTodos.filter(user => user.name.toLowerCase().indexOf(filters.name) !== -1);
    }

    if (filters.company) {
      filters.company = filters.company.toLowerCase();
      filteredTodos = filteredTodos.filter(user => user.company.toLowerCase().indexOf(filters.company) !== -1);
    }*/

    return filteredTodos;
  }
}
