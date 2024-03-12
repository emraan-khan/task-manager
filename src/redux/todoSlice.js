import { createSlice } from "@reduxjs/toolkit";
import { act } from "react-dom/test-utils";

const intitialState = {
    tasks: [{
        id: 1,
        name: "imran",
        date: "2024-03-12",
        description: "null",
        completed: false
    }],
    selectedTask: null,
    viewForm: false
};

const taskSlice = createSlice({
    name: 'task',
    initialState: intitialState,
    reducers: {
        add: (state, action) => {
            state.tasks = [{ id: action.payload.id, name: action.payload.name, date: action.payload.date, description: action.payload.description, completed: false }, ...state.tasks];
        },

        toggle: (state, action) => {
            console.log(action.payload.id, "this is id");
            state.tasks = state.tasks.map((task, i) => {
                if (task.id == action.payload.id) {
                    return {
                        ...task,
                        completed: !task.completed
                    }
                }
                return task;
            })
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => action.payload.id !== task.id)
        },
        updateTask: (state, action) => {
            console.log("update id", action.payload.id);
            state.selectedTask = state.tasks.find((task) => task.id === action.payload.id);

        },
        updateForm: (state,action)=>{
            const { id, name, date, description } = action.payload;
            console.log(id,"this id id from update from")
            const index = state.tasks.findIndex((task)=> task.id===id);
            if(index !==-1){
                state.tasks[index].name=name;
                state.tasks[index].description=description;
                state.tasks[index].date=date;
            }
        },
        toggleForm:(state,action)=>{
            state.viewForm=!state.viewForm;
        }
    }
});

export const taskReducer = taskSlice.reducer;

export const { add, toggle, deleteTask, updateTask , updateForm,toggleForm } = taskSlice.actions;


