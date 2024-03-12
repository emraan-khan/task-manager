import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { add, updateForm ,resetSelected,toggleForm} from '../redux/todoSlice';

const TodoForm = () => {
    const dispatch = useDispatch();
    const selectedTask = useSelector((state) => state.taskReducer.selectedTask);
    const viewForm= useSelector((state)=> state.taskReducer.viewForm);
    if (selectedTask) {
        console.log(selectedTask, "this is selcted task")
    }
    const [tasktext, setTaskText] = useState('');
    const [date, setDate] = useState('');
    const [des, setDes] = useState('');
    // const [viewForm,setViewForm]=useState(false);

    useEffect(()=>{
        if(selectedTask){
            console.log(selectedTask.id,"this id from form");
            setTaskText(selectedTask.name);
            setDate(selectedTask.date);
            setDes(selectedTask.description);
        }
        else{
            setTaskText('');
            setDate('');
            setDes('');
        }
    },[selectedTask]);

    function handleSubmit(e) {
        e.preventDefault();
        if (selectedTask) {
            dispatch(updateForm({
                id: selectedTask.id,
                name: tasktext,
                description: des,
                date: date
            }));
            dispatch(resetSelected());
            reset();
        }
        else{
        dispatch(add({
            id: Math.random().toString(36).substr(2, 10),
            name: tasktext,
            description: des,
            date: date
        }));
        reset();
    }
    };

    function reset(){
        setDate('');
        setTaskText('');
        setDes('');
        dispatch(resetSelected());
    }

    return (
        <div>
        <button onClick={()=> dispatch(toggleForm())}>
            {viewForm ? "Hide Form" : "Add New Task"}
        </button>
        {viewForm && (
            <form onSubmit={handleSubmit}>
                <input placeholder="add task.." type="text" onChange={(e) => setTaskText(e.target.value)} value={tasktext} required />
                <textarea placeholder='add description...' required onChange={(e) => setDes(e.target.value)} value={des} />
                <input type="date" min={moment().format("YYYY-MM-DD")} onChange={(e) => setDate(e.target.value)} required value={date} />
                <button type="submit">{selectedTask ? "Update Task" : "Add Task"}</button>
                <button type="submit" disabled={tasktext === ''} onClick={reset}>Reset</button>
            </form>
        )}
    </div>
    )
}

export default TodoForm;
