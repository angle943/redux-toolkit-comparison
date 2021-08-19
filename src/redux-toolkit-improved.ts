import {
  combineReducers,
  configureStore,
  createSlice,
  getDefaultMiddleware,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v1 as uuid } from "uuid";
import logger from "redux-logger";

import { Todo } from "./type";

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

/* Slices are divided based on their different functions.
 * Here we have three distinct functions.
- todos
- select
- counter
Thus, we have 3 slices.
*/
// createSlice() basically combines createAction() and createReducer()
const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState, // non-primitive value here
  reducers: {
    // Action Creation + Reducer definition done together
    create: {
      reducer: (
        state,
        {
          payload,
        }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>
      ) => {
        state.push(payload);
      },
      // reducer needs to be pure, just sticking to one operation! But if we create random ID inside reducer, that is an anti-pattern. So we are using `prepare` here.
      prepare: ({ desc }: { desc: string }) => ({
        payload: {
          id: uuid(),
          desc,
          isComplete: false,
        },
      }),
    },
    edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
      const todoToEdit = state.find((todo) => todo.id === payload.id);
      if (todoToEdit) {
        todoToEdit.desc = payload.desc;
      }
    },
    toggle: (
      state,
      { payload }: PayloadAction<{ id: string; isComplete: boolean }>
    ) => {
      const todoToToggle = state.find((todo) => todo.id === payload.id);
      if (todoToToggle) {
        todoToToggle.isComplete = payload.isComplete;
      }
    },

    remove: (state, { payload }: PayloadAction<{ id: string }>) => {
      const todoToRemoveIndex = state.findIndex(
        (todo) => todo.id === payload.id
      );
      if (todoToRemoveIndex != -1) {
        state.splice(todoToRemoveIndex, 1);
      }
    },

    // add: (state, { payload }: PayloadAction<{ desc: string }>) => {
    //   state.push({
    //     id: uuid(),
    //     desc: payload.desc,
    //     isComplete: false,
    //   });
    // },

    // clearCompleted: (state) => {
    //   state.forEach((todo) => {
    //     if (todo.isComplete) {
    //       state.splice(state.indexOf(todo), 1);
    //     }
    //   });
    // }
  },
});

/*
store
    slice
        reducers
*/

const selectedTodoslice = createSlice({
  name: "selectedTodo",
  initialState: null as string | null, // primitive value here
  reducers: {
    select: (state, { payload }: PayloadAction<{ id: string | null }>) =>
      payload.id,
    // below will not work with primitive value as state
    // select: (state, { payload }: PayloadAction<{ id: string }>) => {
    //   //   state = payload.id;
    // },
  },
});

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {},
  extraReducers: {
    // actions from other states
    [todosSlice.actions.create.type]: (state) => state + 1,
    [todosSlice.actions.edit.type]: (state) => state + 1,
    [todosSlice.actions.remove.type]: (state) => state + 1,
    [todosSlice.actions.toggle.type]: (state) => state + 1,
  },
});

// Export action with names to be called from index.tsx
// index.tsx will use the values inside key-value pairs to access the reducer actions
export const {
  create: createTodoActionCreator,
  edit: editTodoActionCreator,
  toggle: toggleTodoActionCreator,
  remove: deleteTodoActionCreator,
} = todosSlice.actions;

export const { select: selectTodoActionCreator } = selectedTodoslice.actions;

// Combining reducers
const reducer = {
  todos: todosSlice.reducer,
  selectedTodo: selectedTodoslice.reducer,
  counter: counterSlice.reducer,
};

// getDefaultMiddleware is necessary to tell Redux that we want to use the default middlewares.
const middleware = [...getDefaultMiddleware(), logger];
// comparison: devtool already connected so no need to declare.
export default configureStore({
  reducer,
  middleware,
});
