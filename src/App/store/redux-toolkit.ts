import {
  combineReducers,
  configureStore,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";

import { Todo } from "../../type";

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
const deletedTodos: Todo[] = [];

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: todosInitialState,
    deletedTodos: deletedTodos,
  },
  reducers: {
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
      ) => {
        state.todos.push(payload);
      },
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false,
        },
      }),
    },
    edit: (
      state,
      { payload }: PayloadAction<{ id: string | null; desc: string }>
    ) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.todos[index].desc = payload.desc;
      }
    },
    toggle: (
      state,
      { payload }: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        state.todos[index].isComplete = payload.isComplete;
      }
    },
    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      if (index !== -1) {
        let removed = state.todos.splice(index, 1);
        state.deletedTodos.push(removed[0]);
      }
    },
    recover: (
      state,
      { payload }: PayloadAction<{ whatToDoWithDeletedTodos: string }>
    ) => {
      if (payload.whatToDoWithDeletedTodos === "delete") {
        state.deletedTodos = [];
      } else if (payload.whatToDoWithDeletedTodos === "recover") {
        state.todos = [...state.todos, ...state.deletedTodos];
        state.deletedTodos = [];
      }
    },
    permanentDelete: (state) => {
      state.deletedTodos = [];
    },
  },
});

const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null as string | null,
  reducers: {
    select: (state, { payload }: PayloadAction<{ id: string }>) => payload.id,
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [todosSlice.actions.create.type]: (state) => state + 1,
    [todosSlice.actions.edit.type]: (state) => state + 1,
    [todosSlice.actions.toggle.type]: (state) => state + 1,
    [todosSlice.actions.remove.type]: (state) => state + 1,
  },
});

export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: deleteTodoActionCreator,
  recover: recoverTodoActionCreator,
  permanentDelete: permanentDeleteTodoActionCreator,
} = todosSlice.actions;
export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = combineReducers({
  todos: todosSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
  counter: counterSlice.reducer,
});

export default configureStore({
  reducer,
});
