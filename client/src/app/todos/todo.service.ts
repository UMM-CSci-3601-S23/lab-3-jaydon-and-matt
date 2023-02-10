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
}
