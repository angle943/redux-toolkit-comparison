export interface Todo {
  id: string;
  desc: string;
  isComplete: boolean;
}

export interface ToDoState {
  todos: Todo[];
  deletedTodos: Todo[];
}
export interface State {
  todos: ToDoState;
  selectedTodo: string | null;
  counter: number;
}
