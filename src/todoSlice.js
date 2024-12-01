import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  
  reducers: {
    fetchTodosRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTodosSuccess: (state, action) => {
      state.loading = false;
      state.todos = action.payload;
    },
    fetchTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    addTodoRequest: (state, action) => {
      state.loading = true;
    },
    addTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    },
    addTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteTodoRequest: (state, action) => {
      state.loading = true;
    },
    deleteTodoSuccess: (state, action) => {
      state.loading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    deleteTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateTodoRequest: (state, action) => {
      state.loading = true;
    },
    updateTodoSuccess: (state, action) => {
      state.loading = false;
      const index = state.todos.findIndex((todo) => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    updateTodoFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleCompleteRequest: (state, action) => {
      state.loading = true;
    },
    toggleCompleteSuccess: (state, action) => {
      state.loading = false;
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    toggleCompleteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearTodosRequest: (state) => {
      state.loading = true;
    },
    clearTodosSuccess: (state) => {
      state.loading = false;
      state.todos = [];
    },
    clearTodosFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    editTodoRequest: (state, action) => {
      const { id, newTitle } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if (todo) {
        todo.title = newTitle;
      }
    },    
  },
});

export const {
  fetchTodosRequest,
  fetchTodosSuccess,
  fetchTodosFailure,
  addTodoRequest,
  addTodoSuccess,
  addTodoFailure,
  deleteTodoRequest,
  deleteTodoSuccess,
  deleteTodoFailure,
  updateTodoRequest,
  updateTodoSuccess,
  updateTodoFailure,
  toggleCompleteRequest,
  toggleCompleteSuccess,
  toggleCompleteFailure,
  clearTodosRequest,
  clearTodosSuccess,
  clearTodosFailure,
  editTodoRequest,
} = todoSlice.actions;


export default todoSlice.reducer;
