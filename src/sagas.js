import { takeEvery, put, call } from 'redux-saga/effects';
import {
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
} from './todoSlice.js';

const fetchTodosApi = () => fetch('https://jsonplaceholder.typicode.com/todos').then((res) => res.json());

function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosApi);
    yield put(fetchTodosSuccess(todos.slice(0, 10)));
  } catch (error) {
    yield put(fetchTodosFailure(error.message));
  }
}

function* addTodoSaga(action) {
  try {
    const newTodo = { id: Date.now(), ...action.payload, completed: false };
    yield put(addTodoSuccess(newTodo));
  } catch (error) {
    yield put(addTodoFailure(error.message));
  }
}

function* deleteTodoSaga(action) {
  try {
    yield put(deleteTodoSuccess(action.payload));
  } catch (error) {
    yield put(deleteTodoFailure(error.message));
  }
}

function* updateTodoSaga(action) {
  try {
    yield put(updateTodoSuccess(action.payload));
  } catch (error) {
    yield put(updateTodoFailure(error.message));
  }
}

function* toggleCompleteSaga(action) {
  try {
    yield put(toggleCompleteSuccess(action.payload));
  } catch (error) {
    yield put(toggleCompleteFailure(error.message));
  }
}

function* clearTodosSaga() {
  try {
    yield put(clearTodosSuccess());
  } catch (error) {
    yield put(clearTodosFailure(error.message));
  }
}

export default function* rootSaga() {
  yield takeEvery(fetchTodosRequest.type, fetchTodosSaga);
  yield takeEvery(addTodoRequest.type, addTodoSaga);
  yield takeEvery(deleteTodoRequest.type, deleteTodoSaga);
  yield takeEvery(updateTodoRequest.type, updateTodoSaga);
  yield takeEvery(toggleCompleteRequest.type, toggleCompleteSaga);
  yield takeEvery(clearTodosRequest.type, clearTodosSaga);
}
