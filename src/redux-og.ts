import { combineReducers, createStore, applyMiddleware } from "redux";
import { v1 as uuid } from "uuid";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import { Todo } from "./type";

//////////////////////////////////////////////////////////////////////
// constants
//////////////////////////////////////////////////////////////////////
const CREATE_TODO = "CREATE_TODO";
const EDIT_TODO = "EDIT_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const SELECT_TODO = "SELECT_TODO";

//////////////////////////////////////////////////////////////////////
// actions & action type
//////////////////////////////////////////////////////////////////////
interface ICreateTodo {
  type: typeof CREATE_TODO;
  payload: Todo;
}
export const createTodoActionCreator = ({
  desc,
}: {
  desc: string;
}): ICreateTodo => {
  return {
    type: CREATE_TODO,
    payload: {
      id: uuid(),
      desc,
      isComplete: false,
    },
  };
};
interface IEditTodo {
  type: typeof EDIT_TODO;
  payload: {
    id: string;
    desc: string;
  };
}
export const editTodoActionCreator = ({
  id,
  desc,
}: {
  id: string;
  desc: string;
}): IEditTodo => {
  return {
    type: EDIT_TODO,
    payload: {
      id,
      desc,
    },
  };
};
interface IToggleTodo {
  type: typeof TOGGLE_TODO;
  payload: {
    id: string;
    isComplete: boolean;
  };
}
export const toggleTodoActionCreator = ({
  id,
  isComplete,
}: {
  id: string;
  isComplete: boolean;
}): IToggleTodo => {
  return {
    type: TOGGLE_TODO,
    payload: {
      id,
      isComplete,
    },
  };
};
interface IDeleteTodo {
  type: typeof DELETE_TODO;
  payload: {
    id: string;
  };
}
export const deleteTodoActionCreator = ({
  id,
}: {
  id: string;
}): IDeleteTodo => {
  return {
    type: DELETE_TODO,
    payload: {
      id,
    },
  };
};
interface ISelectTodo {
  type: typeof SELECT_TODO;
  payload: {
    id: string;
  };
}
export const selectTodoActionCreator = ({
  id,
}: {
  id: string;
}): ISelectTodo => {
  return {
    type: SELECT_TODO,
    payload: { id },
  };
};

//////////////////////////////////////////////////////////////////////
// Reducers
//////////////////////////////////////////////////////////////////////
const todosInitialState: Todo[] = [
  {
    id: uuid(),
    desc: "Learn React",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux",
    isComplete: true,
  },
  {
    id: uuid(),
    desc: "Learn Redux-ToolKit",
    isComplete: false,
  },
];
type TodoActionTypes = ICreateTodo | IEditTodo | IToggleTodo | IDeleteTodo;
const todosReducer = (
  state: Todo[] = todosInitialState,
  action: TodoActionTypes
) => {
  switch (action.type) {
    case CREATE_TODO: {
      return [...state, action.payload];
    }
    case EDIT_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, desc: action.payload.desc }
          : todo
      );
    }
    case TOGGLE_TODO: {
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isComplete: action.payload.isComplete }
          : todo
      );
    }
    case DELETE_TODO: {
      return state.filter((todo) => todo.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};

type SelectTodoActionTypes = ISelectTodo;
const selectTodosReducer = (
  state: string | null = null,
  action: SelectTodoActionTypes
) => {
  switch (action.type) {
    case SELECT_TODO: {
      return action.payload.id;
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
  selectedTodo: selectTodosReducer,
  counter: counterReducer,
});

//////////////////////////////////////////////////////////////////////
// Store
//////////////////////////////////////////////////////////////////////
export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk, logger))
);
