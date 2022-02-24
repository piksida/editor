import React, { useCallback } from 'react';
import ToDo from './ToDo';

import {DragDropContext, Droppable} from 'react-beautiful-dnd';

const ToDoList = ({toDoList, setToDoList, handleToggle, handleFilter}) => {

function handleOnDragEnd(result) {
  console.log(result);
  console.log(toDoList);

  //const items = Array.from(toDoList);
  const [reorderedItem] = toDoList.splice(result.source.index, 1);
  toDoList.splice(result.destination.index, 0, reorderedItem);

  let taskName = document.getElementsByClassName("taskBoxName")[0].textContent;
  setToDoList(toDoList);
  //console.log(items);
  sessionStorage.removeItem(taskName);
  console.log(toDoList);
  sessionStorage.setItem(taskName, JSON.stringify(toDoList));
}

    return (
        <div>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref ={provided.innerRef}>

            {toDoList.map((todo, index) => {
                return (
                    <ToDo todo={todo} index={index} toDoList={toDoList} setToDoList={setToDoList} handleToggle={handleToggle} handleFilter={handleFilter}/>
                )
            })}
            {provided.placeholder}
            </ul>
            )}
            </Droppable>
            </DragDropContext>
            <button style={{margin: '20px'}} onClick={handleFilter}>Стереть</button>
        </div>
    );
};

export default ToDoList;