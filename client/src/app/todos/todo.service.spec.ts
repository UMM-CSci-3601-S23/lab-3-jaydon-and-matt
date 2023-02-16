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

  describe('Calling getTodos() with parameters correctly forms the HTTP request', () => {
    /*
     * We really don't care what `getTodos()` returns in the cases
     * where the filtering is happening on the server. Since all the
     * filtering is happening on the server, `getTodos()` is really
     * just a "pass through" that returns whatever it receives, without
     * any "post processing" or manipulation. So the tests in this
     * `describe` block all confirm that the HTTP request is properly formed
     * and sent out in the world, but don't _really_ care about
     * what `getTodos()` returns as long as it's what the HTTP
     * request returns.
     *
     * So in each of these tests, we'll keep it simple and have
     * the (mocked) HTTP request return the entire list `testUsers`
     * even though in "real life" we would expect the server to
     * return return a filtered subset of the users.
     */

    it('correctly calls api/todos with filter parameter \'owner\'', () => {
      todoService.getTodos({ owner: 'blanche' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with the role parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('owner')
      );

      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');

      // Check that the role parameter was 'admin'
      expect(req.request.params.get('owner')).toEqual('blanche');

      req.flush(testTodos);
    });

    it('correctly calls api/users with filter parameter \'body\'', () => {

      todoService.getTodos({ body: 'ad' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with the body parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl) && request.params.has('body')
      );

      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');

      // Check that the age parameter was '25'
      expect(req.request.params.get('body')).toEqual('ad');

      req.flush(testTodos);
    });

    it('correctly calls api/todos with multiple filter parameters', () => {

      todoService.getTodos({ owner: 'roberta', body: 'in' }).subscribe(
        todos => expect(todos).toBe(testTodos)
      );

      // Specify that (exactly) one request will be made to the specified URL with the role parameter.
      const req = httpTestingController.expectOne(
        (request) => request.url.startsWith(todoService.todoUrl)
          && request.params.has('owner') && request.params.has('body')
      );

      // Check that the request made to that URL was a GET request.
      expect(req.request.method).toEqual('GET');

      // Check that the role, company, and age parameters are correct
      expect(req.request.params.get('owner')).toEqual('roberta');
      expect(req.request.params.get('body')).toEqual('in');

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
});
