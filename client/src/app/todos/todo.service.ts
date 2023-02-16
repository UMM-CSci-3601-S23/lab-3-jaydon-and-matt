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

  getTodos(filters?: { owner?: string; body?: string; status?: string }): Observable<Todo[]> {
    // NOTE when we call requests to filter by the server, nothing is actually being filtered
    // we would like to know why

    // `HttpParams` is essentially just a map used to hold key-value
    // pairs that are then encoded as "?key1=value1&key2=value2&…" in
    // the URL when we make the call to `.get()` below.
    let httpParams: HttpParams = new HttpParams();
    if (filters) {
      if (filters.owner) {
        httpParams = httpParams.set('owner', filters.owner);
      }
      if (filters.body) {
        httpParams = httpParams.set('body', filters.body);
      }
      if (filters.status) {
        httpParams = httpParams.set('status', filters.status);
      }
    }

    // Send the HTTP GET request with the given URL and parameters.
    // That will return the desired `Observable<User[]>`.
    return this.httpClient.get<Todo[]>(this.todoUrl, { // /api/users/{parameters here}
      params: httpParams,
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
  filterTodos(todos: Todo[], filters: { category?: string; status?: string }): Todo[] {
    let filteredTodos = todos;
    if (filters.category) {
      filters.category = filters.category.toLowerCase();
      filteredTodos = filteredTodos.filter(todo => todo.category.toLowerCase().indexOf(filters.category) !== -1);
    }

    if (filters.status) {
      let booleanStatus: boolean;
      if(filters.status === 'complete') { booleanStatus = true; }
      else if(filters.status === 'incomplete') { booleanStatus = false; };
      filteredTodos = filteredTodos.filter(todo => todo.status === booleanStatus);
    }

    return filteredTodos;
  }
}
