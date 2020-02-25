export interface Todo {
  id: string;
  desc: string;
  isComplete: boolean;
}

export interface State {
  todos: Todo[];
  selectedTodo: string | null;
  counter: number;
}
