import { createSlice } from "@reduxjs/toolkit";

// Helper functions to handle local storage
const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (e) {
    console.error("Could not load state from local storage", e);
    return [];
  }
};

const saveToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tasks', serializedState);
  } catch (e) {
    console.error("Could not save state to local storage", e);
  }
};

const initialState = {
  tasks: loadFromLocalStorage(),
  selectedTask: null,
  viewForm: false
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    add: (state, action) => {
      state.tasks = [{ id: action.payload.id, name: action.payload.name, date: action.payload.date, description: action.payload.description, completed: false }, ...state.tasks];
      saveToLocalStorage(state.tasks);
    },
    toggle: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            completed: !task.completed
          };
        }
        return task;
      });
      saveToLocalStorage(state.tasks);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => action.payload.id !== task.id);
      saveToLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      state.selectedTask = state.tasks.find((task) => task.id === action.payload.id);
    },
    updateForm: (state, action) => {
      const { id, name, date, description } = action.payload;
      const index = state.tasks.findIndex((task) => task.id === id);
      if (index !== -1) {
        state.tasks[index].name = name;
        state.tasks[index].description = description;
        state.tasks[index].date = date;
      }
      saveToLocalStorage(state.tasks);
    },
    toggleForm: (state) => {
      state.viewForm = !state.viewForm;
    },
    resetSelected: (state) => {
      state.selectedTask = null;
    }
  }
});

export const taskReducer = taskSlice.reducer;
export const { add, toggle, deleteTask, updateTask, updateForm, toggleForm, resetSelected } = taskSlice.actions;
