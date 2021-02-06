import { createSlice, PayloadAction, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import logger from "redux-logger";
import { Todo } from "./type";

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

const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    create: {
      reducer: (state, action: PayloadAction<{ id: string; desc: string; isComplete: boolean }>) => {
        const { payload } = action;
        state.push(payload);
      },
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false
        }
      })
    },
    edit: (state, action: PayloadAction<{ id: string; desc: string }>) => {
      const { payload } = action;
      const todoToEdit = state.find(todo => todo.id === payload.id);
      if (todoToEdit) {
        todoToEdit.desc = payload.desc;
      }
    },
    toggle: (state, action: PayloadAction<{ id: string; isComplete: boolean }>) => {
      const { payload } = action;
      const todoToToggle = state.find(todo => todo.id === payload.id);
      if (todoToToggle) {
        todoToToggle.isComplete = payload.isComplete;
      }
    },
    remove: (state, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;
      const index = state.findIndex(todo => todo.id === payload.id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    }
  }
});

const selectedTodoSlice = createSlice({
  name: "selectedTodo",
  initialState: null as string | null,
  reducers: {
    select: (state, action: PayloadAction<{ id: string }>) => {
      const { payload } = action;
      return payload.id;
    }
  }
});

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    [todosSlice.actions.create.type]: state => state + 1,
    [todosSlice.actions.edit.type]: state => state + 1,
    [todosSlice.actions.toggle.type]: state => state + 1,
    [todosSlice.actions.remove.type]: state => state + 1
  }
});

export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: deleteTodoActionCreator
} = todosSlice.actions;
export const { select: selectTodoActionCreator } = selectedTodoSlice.actions;

const reducer = {
  todos: todosSlice.reducer,
  selectedTodo: selectedTodoSlice.reducer,
  counter: counterSlice.reducer
};

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), logger],
  devTools: true
});
