import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThunk } from './store';

interface Todo {
  id: string;
  title: string;
  description?: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: []
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    }
  }
});

export const { setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;

export const fetchTodos = (): AppThunk => async dispatch => {
  try {
    const jsonValue = await AsyncStorage.getItem('todos');
    const todos = jsonValue != null ? JSON.parse(jsonValue) : [];
    dispatch(setTodos(todos));
  } catch (e) {
    console.error(e);
  }
};

export const saveTodos = (todos: Todo[]): AppThunk => async dispatch => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem('todos', jsonValue);
  } catch (e) {
    console.error(e);
  }
};

export default todoSlice.reducer;
