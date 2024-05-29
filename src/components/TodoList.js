// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggle, deleteTask, updateTask,toggleForm } from '../redux/todoSlice';

// const TodoList = () => {
//     const dispatch = useDispatch();
//     const tasks = useSelector(state => state.taskReducer.tasks);
//     const viewForm = useSelector((state)=> state.taskReducer.viewForm);

//     const [filter, setFilter] = useState('all');
//     const [viewList, setViewList] = useState(false)

//     const toggleTask = id => {
//         dispatch(toggle({ id }));
//     };

//     const handleDelete = id => {
//         dispatch(deleteTask({ id }));
//     };

//     function handleEdit(id) {
//         if(!viewForm)
//         dispatch(toggleForm());
//         dispatch(updateTask({ id }));
//     }

//     // Filter tasks based on completion status
//     const filteredTasks = filter === 'completed' ? tasks.filter(task => task.completed) :
//         filter === 'uncompleted' ? tasks.filter(task => !task.completed) :
//             tasks;

//     return (
//         <div>
//             <button onClick={() => setViewList(!viewList)}>
//                 {viewList ? "Hide List" : "View List"}
//             </button>
//             {viewList && (
//                 <div>
//                     <span onClick={() => setFilter('all')}>All</span>
//                     <span onClick={() => setFilter('completed')} style={{ paddingLeft: "20px" }}>Completed</span>
//                     <span onClick={() => setFilter('uncompleted')} style={{ paddingLeft: "20px" }}>Uncompleted</span>
//                 </div>
//             )}
//             {viewList && (
//                 filteredTasks.length ? (
//                     filteredTasks.map(task => (
//                         <div key={task.id}>
//                             <input
//                                 type="checkbox"
//                                 checked={task.completed}
//                                 onChange={() => toggleTask(task.id)}
//                             />
//                             <span style={{ paddingRight: "20px" }}>{task.name}</span>
//                             <span style={{ paddingRight: "20px" }}>{task.description}</span>
//                             <span>{task.date}</span>
//                             <span style={{ paddingLeft: "20px" }}>
//                                 <button onClick={() => handleEdit(task.id)}>Edit</button>
//                             </span>
//                             <span style={{ paddingLeft: "20px" }}>
//                                 <button onClick={() => handleDelete(task.id)}>Delete</button>
//                             </span>
//                         </div>
//                     ))
//                 ) : (
//                     <div>List is Empty</div>
//                 )
//             )}
//         </div>
//     );
// };

// export default TodoList;


import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggle, deleteTask, updateTask, toggleForm } from '../redux/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.taskReducer.tasks);
  const viewForm = useSelector(state => state.taskReducer.viewForm);

  const [filter, setFilter] = useState('all');
  const [viewList, setViewList] = useState(false);

  const toggleTask = id => {
    dispatch(toggle({ id }));
  };

  const handleDelete = id => {
    dispatch(deleteTask({ id }));
  };

  function handleEdit(id) {
    if (!viewForm) dispatch(toggleForm());
    dispatch(updateTask({ id }));
  }

  const filteredTasks = filter === 'completed' ? tasks.filter(task => task.completed) :
    filter === 'uncompleted' ? tasks.filter(task => !task.completed) :
      tasks;

  return (
    <div className='cont'>
      <button onClick={() => setViewList(!viewList)} className='button'>
        {viewList ? "Hide List" : "View List"}
      </button>
      {viewList && (
        <div className='cat'>
          <span
            onClick={() => setFilter('all')}
            style={{ borderBottom: filter === 'all' ? '2px solid blue' : 'none' }}
          >
            All
          </span>
          <span
            onClick={() => setFilter('completed')}
            style={{ paddingLeft: "0px", borderBottom: filter === 'completed' ? '2px solid blue' : 'none' }}
          >
            Completed
          </span>
          <span
            onClick={() => setFilter('uncompleted')}
            style={{ paddingLeft: "0px", borderBottom: filter === 'uncompleted' ? '2px solid blue' : 'none' }}
          >
            Uncompleted
          </span>
        </div>
      )}
      {viewList && (
        filteredTasks.length ? (
          filteredTasks.map(task => (
            <div key={task.id} className='task-div'>
            <div className='task-t'>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span style={{ paddingRight: "20px" }}>{task.name}</span>
            </div>
            <div>
              <span style={{ paddingRight: "20px" }}>{task.description}</span>
            </div>
            <div>
              <span>{task.date}</span>
              <span style={{ paddingLeft: "20px" }}>
                <button className='edit' onClick={() => handleEdit(task.id)}>Edit</button>
              </span>
              <span style={{ paddingLeft: "20px" }}>
                <button className='delete' onClick={() => handleDelete(task.id)}>Delete</button>
              </span>
            </div>
            </div>
          ))
        ) : (
          <div className='empty'>List is Empty!!!</div>
        )
      )}
    </div>
  );
};

export default TodoList;

