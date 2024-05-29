// import React, { useEffect, useState } from 'react'
// import moment from 'moment';
// import { useDispatch, useSelector } from 'react-redux';
// import { add, updateForm ,resetSelected,toggleForm} from '../redux/todoSlice';

// const TodoForm = () => {
//     const dispatch = useDispatch();
//     const selectedTask = useSelector((state) => state.taskReducer.selectedTask);
//     const viewForm= useSelector((state)=> state.taskReducer.viewForm);
//     if (selectedTask) {
//         console.log(selectedTask, "this is selcted task")
//     }
//     const [tasktext, setTaskText] = useState('');
//     const [date, setDate] = useState('');
//     const [des, setDes] = useState('');
//     // const [viewForm,setViewForm]=useState(false);

//     useEffect(()=>{
//         if(selectedTask){
//             console.log(selectedTask.id,"this id from form");
//             setTaskText(selectedTask.name);
//             setDate(selectedTask.date);
//             setDes(selectedTask.description);
//         }
//         else{
//             setTaskText('');
//             setDate('');
//             setDes('');
//         }
//     },[selectedTask]);

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (selectedTask) {
//             dispatch(updateForm({
//                 id: selectedTask.id,
//                 name: tasktext,
//                 description: des,
//                 date: date
//             }));
//             dispatch(resetSelected());
//             reset();
//         }
//         else{
//         dispatch(add({
//             id: Math.random().toString(36).substr(2, 10),
//             name: tasktext,
//             description: des,
//             date: date
//         }));
//         reset();
//     }
//     };

//     function reset(){
//         setDate('');
//         setTaskText('');
//         setDes('');
//         dispatch(resetSelected());
//     }

//     return (
//         <div>
//         <button onClick={()=> dispatch(toggleForm())}>
//             {viewForm ? "Hide Form" : "Add New Task"}
//         </button>
//         {viewForm && (
//             <form onSubmit={handleSubmit}>
//                 <input placeholder="add task.." type="text" onChange={(e) => setTaskText(e.target.value)} value={tasktext} required />
//                 <textarea placeholder='add description...' required onChange={(e) => setDes(e.target.value)} value={des} />
//                 <input type="date" min={moment().format("YYYY-MM-DD")} onChange={(e) => setDate(e.target.value)} required value={date} />
//                 <button type="submit">{selectedTask ? "Update Task" : "Add Task"}</button>
//                 <button type="submit" disabled={tasktext === ''} onClick={reset}>Reset</button>
//             </form>
//         )}
//     </div>
//     )
// }

// export default TodoForm;


import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { add, updateForm, resetSelected, toggleForm } from '../redux/todoSlice';

const TodoForm = () => {
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.taskReducer.selectedTask);
  const viewForm = useSelector((state) => state.taskReducer.viewForm);

  const [taskText, setTaskText] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTaskText(selectedTask.name);
      setDate(selectedTask.date);
      setDescription(selectedTask.description);
    } else {
      setTaskText('');
      setDate('');
      setDescription('');
    }
  }, [selectedTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedTask) {
      dispatch(updateForm({
        id: selectedTask.id,
        name: taskText,
        description: description,
        date: date
      }));
    } else {
      dispatch(add({
        id: Math.random().toString(36).substr(2, 10),
        name: taskText,
        description: description,
        date: date
      }));
    }
    reset();
  };

  const reset = () => {
    setTaskText('');
    setDate('');
    setDescription('');
    dispatch(resetSelected());
  };

  return (
    <div>
      <button onClick={() => dispatch(toggleForm())} className='button'>
        {viewForm ? "Hide Form" : "Add New Task"}
      </button>
      {viewForm && (
        <form onSubmit={handleSubmit} className='form-div'>
          <input
            type="text"
            placeholder="Add task..."
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            required
            className='title-input'
          />
          <textarea
            rows='5'
            placeholder="Add description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className='todo-des'
          />
          <div>
          <input
            type="date"
            min={moment().format("YYYY-MM-DD")}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className='todo-date'
          />
          <button className='f-btn' type="submit">{selectedTask ? "Update Task" : "Add Task"}</button>
          <button className='f-btn' type="button" onClick={reset} disabled={!taskText}>Reset</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TodoForm;

