import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodosRequest,
  addTodoRequest,
  deleteTodoRequest,
  toggleCompleteRequest,
  clearTodosRequest,
} from './todoSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    if (savedTodos.length > 0) {
      dispatch(fetchTodosRequest(savedTodos));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      dispatch(addTodoRequest({ title: newTodo }));
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id) => {
    dispatch(toggleCompleteRequest(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodoRequest(id));
  };

  const handleClear = () => {
    dispatch(clearTodosRequest());
    localStorage.removeItem('todos'); 
  };

  return (
    <div className="app-container">
      <h1>TODO List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new todo"
      />
      <button onClick={handleAddTodo}>Add</button>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                cursor: 'pointer',
              }}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={handleClear}>Clear All</button>
    </div>
  );
}

export default App;
