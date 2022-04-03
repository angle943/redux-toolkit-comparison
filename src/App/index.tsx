import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  createTodoActionCreator,
  editTodoActionCreator,
  deleteTodoActionCreator,
  toggleTodoActionCreator,
  selectTodoActionCreator,
  recoverTodoActionCreator,
  permanentDeleteTodoActionCreator,
} from "./store/redux-toolkit";

import { Todo, State } from "../type";
import "./App.css";

const App: React.FC = (): JSX.Element => {
  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [editTodoInput, setEditTodoInput] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [todosToShow, setTodosToShow] = useState<Todo[]>([]);
  const editInput = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const { todos } = useSelector((state: State) => state.todos);
  const selectedTodoId = useSelector((state: State) => state.selectedTodo);
  const editedCount = useSelector((state: State) => state.counter);

  console.log("todos ", todos);
  const selectedTodo =
    (selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
    null;

  useEffect(() => {
    setTodosToShow([...todos]);
  }, [todos]);

  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoInput(e.target.value);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTodoInput(e.target.value);
  };

  const handleCreateNewTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTodoInput.trim() === "") return;
    dispatch(createTodoActionCreator({ desc: newTodoInput }));
    setNewTodoInput("");
  };
  const handleSelectTodo = (todoId: string) => (): void => {
    dispatch(selectTodoActionCreator({ id: todoId }));
  };

  const handleEdit = (): void => {
    if (!selectedTodo) return;

    setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
      editInput?.current?.focus();
    }
  }, [isEditMode]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(
      editTodoActionCreator({ id: selectedTodoId, desc: editTodoInput })
    );
    setEditTodoInput("");
  };

  const handleCancelUpdate = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleToggle = (): void => {
    if (!selectedTodoId || !selectedTodo) return;
    dispatch(
      toggleTodoActionCreator({
        id: selectedTodoId,
        isComplete: !selectedTodo.isComplete,
      })
    );
  };

  const handleDelete = (): void => {
    if (!selectedTodoId) return;
    dispatch(deleteTodoActionCreator({ id: selectedTodoId }));
  };

  const handleAll = (): void => {
    setTodosToShow([...todos]);
  };
  const handleActive = (): void => {
    let activeTodos = todos.filter((x) => {
      return x.isComplete !== true;
    });
    setTodosToShow(activeTodos);
  };
  const handleCompleted = (): void => {
    let activeTodos = todos.filter((x) => {
      return x.isComplete === true;
    });
    setTodosToShow(activeTodos);
  };
  const handleRecover = (): void => {
    dispatch(recoverTodoActionCreator({ whatToDoWithDeletedTodos: "recover" }));
  };
  const handlePermanentDelete = (): void => {
    dispatch(permanentDeleteTodoActionCreator());
  };

  return (
    <div className="App">
      <div className="App__counter">Todos Updated Count: {editedCount}</div>
      <div className="App__header">
        <h1>OBG</h1>
        <form onSubmit={handleCreateNewTodo}>
          <label htmlFor="new-todo">Add new:</label>
          <input
            onChange={handleNewInputChange}
            id="new-todo"
            value={newTodoInput}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div className="App__body">
        <ul className="App__list">
          <h2>My Todos:</h2>
          {todosToShow?.map((todo, i) => (
            <li
              className={`${todo.isComplete ? "done" : ""} ${
                todo.id === selectedTodoId ? "active" : ""
              }`}
              key={todo.id}
              onClick={handleSelectTodo(todo.id)}
            >
              <span className="list-number">{i + 1})</span> {todo.desc}
            </li>
          ))}
          <div className="todo-actions">
            <button onClick={handleAll}>All</button>
            <button onClick={handleActive}>Active</button>
            <button onClick={handleCompleted}>Completed</button>
            <button onClick={handleRecover}>Recover Deleted</button>
            <br />
            <button onClick={handlePermanentDelete}>Delete Permanent</button>
          </div>
        </ul>
        <div className="App_todo-info">
          <h2>Selected Todo:</h2>
          {selectedTodo === null ? (
            <span className="empty-state">No Todo Selected</span>
          ) : !isEditMode ? (
            <>
              <span
                className={`todo-desc ${
                  selectedTodo?.isComplete ? "done" : ""
                }`}
              >
                {selectedTodo.desc}
              </span>
              <div className="todo-actions">
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleToggle}>Toggle</button>
                <button onClick={handleDelete}>Delete</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleUpdate}>
              <label htmlFor="edit-todo">Edit:</label>
              <input
                ref={editInput}
                onChange={handleEditInputChange}
                value={editTodoInput}
              />
              <button type="submit">Update</button>
              <button onClick={handleCancelUpdate}>Cancel</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
