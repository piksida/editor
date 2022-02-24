import React, { useRef, useCallback, useState } from 'react';

import {Draggable} from 'react-beautiful-dnd';

const ToDo = ({todo, index, handleToggle, toDoList, setToDoList}) => {

    const handleClick = (e) => {
        console.log("check");
        e.preventDefault()
        handleToggle(e.currentTarget.id)
    }



    return (
<Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
  {(provided) => (


    <div className="todolist" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >
    <div className="list-row"  >

            <input type="checkbox" id={todo.id}  key={todo.id + todo.task} name="todo" checked={todo.complete ? true : false} value={todo.id} className={todo.complete ? "todo strike" : "todo"} onInput={handleClick}/>

       <label  for="checkbox" className="todo-label" style={{ textDecoration: todo.complete? "line-through" : ""}}><p >&nbsp;{todo.task}</p></label>

</div>
            </div>

             )}
            </Draggable>

    );
};

export default ToDo;