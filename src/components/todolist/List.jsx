import React, { useState, useCallback } from 'react';
//mock data
import data from "./data.json";

import "./todolist.css";

import ToDoList from "./ToDoList";
import ToDoForm from './ToDoForm';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

const List = ({taskBoxName, setTaskBoxName, toDoList, setToDoList, currentShape}) => {
//const [ taskDone, setTaskDone ] = useState(false);


  const handleToggle = (id) => {
    let mapped = toDoList.map(task => {
      return task.id === Number(id) ? { ...task, complete: !task.complete } : { ...task};
    });
    sessionStorage.setItem(taskBoxName, JSON.stringify(mapped));
    setToDoList(mapped);
    console.log("set");
  }

  const handleFilter = () => {
    let filtered = toDoList.filter(task => {
      return !task.complete;
    });
    sessionStorage.setItem(taskBoxName, JSON.stringify(filtered));
    setToDoList(filtered);
  }

  const changeColor = (e) => {
    //console.log(e.target.checked());
    //console.log(JSON.parse(sessionStorage[taskBoxName+"done"])===true);
    let taskBtn = document.getElementById("checkbox-task");
    if (taskBoxName!==""){
    let currentColor = currentShape.style["fill"];


    if (e.target.checked===true){
      //taskBtn.checked=true;

      if (currentColor!=="white"){
      currentShape.style = { fill: currentColor+"80"};}
      sessionStorage.setItem(taskBoxName + "done", true);
      //taskBtn.checked=true;
    }else {
      console.log(currentColor);
      console.log(currentColor.length);
      sessionStorage.setItem(taskBoxName + "done", false);

      //taskBtn.checked = false;

      if (currentColor!=="white"){
      currentColor = currentColor.substring(0, currentColor.length - 2);
      //currentColor = currentColor.slice(currentColor.length);
      console.log(currentColor);
      currentShape.style = { fill: currentColor };}

    }
    }
    //console.log(currentShape.style["fill"]);
    //let currentColor = currentShape.style["fill"];
    //currentColor = currentColor.slice(1);
    //console.log(currentColor);
    //currentShape.style = { fill: currentColor+"80"};
  }

  const addTask = (userInput ) => {
    if(taskBoxName!=""){
      let copy = [...toDoList];
      copy  = [...copy, { id: toDoList.length + 1, task: userInput, complete: false}];
      sessionStorage.setItem(taskBoxName, JSON.stringify(copy));
      console.log(sessionStorage.getItem(taskBoxName));
      setToDoList(copy);
      console.log(toDoList);
      }
  }
  function checkButton () {
    let done = sessionStorage.getItem(taskBoxName+"done");
    if (done !== ""){
      return JSON.parse(sessionStorage[taskBoxName+"done"])===true? true : false;
    }else {
      return false;
    }
    console.log(done);
    return done;
  }

  function changeTaskName (newTaskName) {
    console.log(taskBoxName);

    if(sessionStorage.getItem(taskBoxName)){
    let oldList = sessionStorage.getItem(taskBoxName);
    console.log(oldList);
    sessionStorage.setItem(newTaskName, oldList);
    sessionStorage.removeItem(taskBoxName);
    }

    currentShape.annotations[0].content = newTaskName;
    setTaskBoxName(newTaskName);
  }

  return (
    <div className="List">
      <div className="primitive-name">
         <div class="round">

    <input  type="checkbox"  id="checkbox" name="task-checkbox" onClick={changeColor}/>
    <label for="checkbox"></label>
  </div>
  <EditText className="taskBoxName"  defaultValue={""} onSave={(value) => changeTaskName(value.value)} />
      </div>
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} handleToggle={handleToggle} handleFilter={handleFilter} />
      <ToDoForm addTask={addTask}/>
    </div>
  );
}

export default List;