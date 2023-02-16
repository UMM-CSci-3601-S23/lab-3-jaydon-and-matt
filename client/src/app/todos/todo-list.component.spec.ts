import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { MockTodoService } from '../../testing/todo.service.mock';
import { Todo } from './todo';
import { TodoCardComponent } from './todo-card.component';
import { TodoListComponent } from './todo-list.component';
import { TodoService } from './todo.service';

const COMMON_IMPORTS: any[] = [
  FormsModule,
  MatCardModule,
  MatFormFieldModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  MatInputModule,
  MatExpansionModule,
  MatTooltipModule,
  MatListModule,
  MatDividerModule,
  MatRadioModule,
  MatSnackBarModule,
  BrowserAnimationsModule,
  RouterTestingModule,
];

describe('TodoListComponent', () => {
  let todoList: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [COMMON_IMPORTS],
      declarations: [TodoListComponent, TodoCardComponent],
      // providers:    [ TodoService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      // This MockTodoService is defined in client/testing/todo.service.mock.
      providers: [{ provide: TodoService, useValue: new MockTodoService() }]
    });
  });

  // This constructs the `todoList` (declared
  // above) that will be used throughout the tests.
  beforeEach(waitForAsync(() => {
    // Compile all the components in the test bed
    // so that everything's ready to go.
    TestBed.compileComponents().then(() => {
      /* Create a fixture of the TodoListComponent. That
       * allows us to get an instance of the component
       * (todoList, below) that we can control in
       * the tests.
      */
      fixture = TestBed.createComponent(TodoListComponent);
      todoList = fixture.componentInstance;
      /* Tells Angular to sync the data bindings between
       * the model and the DOM. This ensures, e.g., that the
       * `userList` component actually requests the list
       * of users from the `MockUserService` so that it's
       * up to date before we start running tests on it.
      */
      fixture.detectChanges();
    });
  }));

  it('should create', () => {
    expect(todoList).toBeTruthy();
  });

  it('contains all the todos', () => {
    expect(todoList.serverFilteredTodos.length).toBe(4);
  });

  it('contains a todo named "Bob"', () => {
    expect(todoList.serverFilteredTodos.some((todo: Todo) => todo.owner === 'Bob')).toBe(true);
  });

  it('has two todos that have the category homework', () => {
    expect(todoList.serverFilteredTodos.filter((todo: Todo) => todo.category === 'homework').length).toBe(2);
  });
});
