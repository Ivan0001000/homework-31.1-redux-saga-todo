import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodosRequest,
  addTodoRequest,
  deleteTodoRequest,
  toggleCompleteRequest,
  clearTodosRequest,
  editTodoRequest,
} from './todoSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { todos } = useSelector((state) => state.todos);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  useEffect(() => {
    dispatch(fetchTodosRequest());
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

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = () => {
    if (editingTitle.trim()) {
      dispatch(editTodoRequest({ id: editingId, newTitle: editingTitle }));
      setEditingId(null);
      setEditingTitle('');
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

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleToggleComplete(todo.id)}
                >
                  {todo.title}
                </span>
                <button onClick={() => handleEdit(todo.id, todo.title)}>
                  Edit
                </button>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      <button onClick={handleClear}>Clear All</button>
    </div>
  );
}

export default App;
