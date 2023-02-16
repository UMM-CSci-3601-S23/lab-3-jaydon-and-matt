import { TodoService } from './todo.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Todo } from './todo';


describe('TodoService', () => {

  const testTodos: Todo[] = [
    {
      _id: 'chris_id',
      owner: 'Chris',
      status: true,
      body: 'test',
      category: 'video games'
    },
  ];
  let todoService: TodoService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // Set up the mock handling of the HTTP requests
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    // Construct an instance of the service with the mock
    // HTTP client.
    todoService = new TodoService(httpClient);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(todoService).toBeTruthy();
  });

  it('calls `api/todos` when `getTodos()` is called with no parameters', () => {
    // Assert that the users we get from this call to getTodos()
    // should be our set of test todos. Because we're subscribing
    // to the result of getTodos(), this won't actually get
    // checked until the mocked HTTP request 'returns' a response.
    // This happens when we call req.flush(testTodos) a few lines
    // down.
    todoService.getTodos().subscribe(
      todos => expect(todos).toBe(testTodos)
    );

    // Specify that (exactly) one request will be made to the specified URL.
    const req = httpTestingController.expectOne(todoService.todoUrl);
    // Check that the request made to that URL was a GET request.
    expect(req.request.method).toEqual('GET');
    // Check that the request had no query parameters.
    expect(req.request.params.keys().length).toBe(0);
    // Specify the content of the response to that request. This
    // triggers the subscribe above, which leads to that check
    // actually being performed.
    req.flush(testTodos);
  });

  describe('getTodosByID()', () => {
    it('calls api/todos/id with the correct ID', () => {
      // We're just picking a Todo "at random" from our little
      // set of Todos up at the top.
      const targetTodo: Todo = testTodos[0];
      const targetId: string = targetTodo._id;

      todoService.getTodoById(targetId).subscribe(
        // This `expect` doesn't do a _whole_ lot.
        // Since the `targetTodo`
        // is what the mock `HttpClient` returns in the
        // `req.flush(targetTodo)` line below, this
        // really just confirms that `getTodoByid()`
        // doesn't in some way modify the user it
        // gets back from the server.
        todo => expect(todo).toBe(targetTodo)
      );

      const expectedUrl: string = todoService.todoUrl + '/' + targetId;
      const req = httpTestingController.expectOne(expectedUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(targetTodo);
    });
  });
});
