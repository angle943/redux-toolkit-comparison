import { combineReducers, createStore, applyMiddleware } from "redux";
import { v1 as uuid } from "uuid";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import { Todo } from "./type";

// constants
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";

// Actions & Action Type
interface CreateTodoActionType {
  type: typeof CREATE_TODO;
  payload: Todo;
}
export const createTodoActionCreator = ({
  desc
}: {
  desc: string;
}): CreateTodoActionType => {
  return {
    type: CREATE_TODO,
    payload: {
      id: uuid(),
      desc,
      isComplete: false
    }
  };
};

interface EditTodoActionType {
  type: typeof EDIT_TODO;
  payload: { id: string; desc: string };
}
export const editTodoActionCreator = ({
  id,
  desc
}: {
  id: string;
  desc: string;
}): EditTodoActionType => {
  return {
    type: EDIT_TODO,
    payload: { id, desc }
  };
};

interface ToggleTodoActionType {
  type: typeof TOGGLE_TODO;
  payload: { id: string; isComplete: boolean };
}
export const toggleTodoActionCreator = ({
  id,
  isComplete
}: {
  id: string;
  isComplete: boolean;
}): ToggleTodoActionType => {
  return {
    type: TOGGLE_TODO,
    payload: { id, isComplete }
  };
};

interface DeleteTodoActionType {
  type: typeof DELETE_TODO;
  payload: { id: string };
}
export const deleteTodoActionCreator = ({
  id
}: {
  id: string;
}): DeleteTodoActionType => {
  return {
    type: DELETE_TODO,
    payload: { id }
  };
};

interface SelectTodoActionType {
  type: typeof SELECT_TODO;
  payload: { id: string };
}
export const selectTodoActionCreator = ({
  id
}: {
  id: string;
}): SelectTodoActionType => {
  return {
    type: SELECT_TODO,
    payload: { id }
  };
};

// Reducers

const todosInitialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true
  },
  {
    id: uuid(),
    desc: "Learn Redux-ToolKit",
    isComplete: false
  }
];

type TodoActionTypes =
  | CreateTodoActionType
  | EditTodoActionType
  | ToggleTodoActionType
  | DeleteTodoActionType;
const todosReducer = (
  state: Todo[] = todosInitialState,
  action: TodoActionTypes
) => {
  switch (action.type) {
    case CREATE_TODO: {
      const { payload } = action;
      return [...state, payload];
    }
    case EDIT_TODO: {
      const { payload } = action;
      return state.map(todo =>
        todo.id === payload.id ? { ...todo, desc: payload.desc } : todo
      );
    }
    case TOGGLE_TODO: {
      const { payload } = action;
      return state.map(todo =>
        todo.id === payload.id
          ? { ...todo, isComplete: payload.isComplete }
          : todo
      );
    }
    case DELETE_TODO: {
      const { payload } = action;
      return state.filter(todo => todo.id !== payload.id);
    }
    default: {
      return state;
    }
  }
};

type SelectedTodoActionTypes = SelectTodoActionType;
const selectedTodoReducer = (
  state: string | null = null,
  action: SelectedTodoActionTypes
) => {
  switch (action.type) {
    case SELECT_TODO: {
      const { payload } = action;
      return payload.id;
    }
    default: {
      return state;
    }
  }
};

const counterReducer = (state: number = 0, action: TodoActionTypes) => {
  switch (action.type) {
    case CREATE_TODO: {
      return state + 1;
    }
    case EDIT_TODO: {
      return state + 1;
    }
    case TOGGLE_TODO: {
      return state + 1;
    }
    case DELETE_TODO: {
      return state + 1;
    }
    default: {
      return state;
    }
  }
};

const reducers = combineReducers({
  todos: todosReducer,
  selectedTodo: selectedTodoReducer,
  counter: counterReducer
});

// Store
export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
