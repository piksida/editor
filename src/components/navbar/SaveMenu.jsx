import React, { useState } from 'react';

import './savemenu.css';

import AlertAuth from './AlertAuth.jsx'

const SaveMenu = ({ showAuth, setShowAuth, setShowSaveMenu, projectName, setProjectName, setShowAlert, setAlertMessage }) => {

const closeSaveMenu = () => {
  setShowSaveMenu(false);
}

const createNewProject = () => {
  let diagramElement = document.getElementById("diagram");
  let diagram: Object[] = diagramElement.ej2_instances[0];

  diagram.clear();

  sessionStorage.clear();

  if(projectName!="Новая карта"){
    setProjectName("Новая карта");
  }

  setShowSaveMenu(false);
  document.getElementsByClassName("projectName")[0].lastChild.data = "Новая карта";
}

const saveProject = () => {
  const userName = localStorage.getItem("profile");

  if (userName) {
    if (projectName==="Новая карта"){
    setShowSaveMenu(false);
    setAlertMessage("Назовите ваш проект!");
    setShowAlert(true);

    }else{
  let diagramElement = document.getElementById("diagram");
  let diagram: Object[] = diagramElement.ej2_instances[0];
  let saveData: string;

  saveData = diagram.saveDiagram();

  let currentUserId = localStorage.getItem(userName);

  let sessionData = { user_id: currentUserId, drawingName: projectName };
           const items = {...sessionStorage};
           sessionData["session"] = items;

           fetch('http://172.17.0.1:8080/session', {
               method: 'POST',
               mode: 'cors',
               headers: {
               'Accept': 'application/json',
               'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionData)
                }).then(function (response) {
                   response.json().then(function(data) {
                   console.log(data);
                })});

  let data = {user_id: currentUserId, name: projectName, drawing: saveData};

  fetch('http://172.17.0.1:8080/drawings', {
        method: 'POST',
        mode: 'cors',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then(function (response) {
            response.json().then(function(data) {
            console.log(data);
            })});

        setShowSaveMenu(false);
        }
      }
  else{
    setShowSaveMenu(false);
    setShowAlert(true);
    setShowAuth(true);
  }


}


  return (
    <div className="save-menu">
      <div className="save-menu-content">
        <span className="close" onClick={closeSaveMenu} >&times;</span>
        <p>Сохранить изменения в текущем проекте?</p>
          <div className="save-menu-buttons">
            <h className="yes-button" onClick={saveProject}>Да</h>
            <h className="no-button" onClick={createNewProject}>Нет</h>
          </div>
      </div>
    </div>
  );
}

export default SaveMenu;

 /*if (userName) {
      let diagramElement = document.getElementById("diagram");
      let diagram: Object[] = diagramElement.ej2_instances[0];
      let saveData: string;

      saveData = diagram.saveDiagram();

      console.log(saveData);
  }else{
      setShowAlert(true);
      setShowAuth(true);
  }

  closeBtn.addEventListener("click", () => {
  svMenu.style.display = "none"
})
  */