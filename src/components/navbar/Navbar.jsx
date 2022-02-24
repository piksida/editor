import React, { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

import './navbar.css';

import Auth from '../auth/Auth';
import { DiagramComponent, SymbolPaletteComponent, Node, PrintAndExport, Diagram, UndoRedo } from "@syncfusion/ej2-react-diagrams";


const Navbar = ({setGridlinesColor, gridlinesColor, setShowNavbar, setShowList, showAuth, setShowAuth, projectName, setProjectName, setShowSaveMenu,
setAlertMessage, setShowAlert}) => {
  //const [showAuth, setShowAuth] = useState(false);
  const [loginButtonName, setLoginButtonName] = useState("Войти");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [drawings, setDrawings] = useState([{name: "hello"}]);

  const setGrid=()=>{
    (gridlinesColor==="white") ? setGridlinesColor("#e0e0e0") : setGridlinesColor("white");
  }

  const handleLoginButton=()=>{
  let loginBtnName = localStorage.getItem("profile") ? localStorage.getItem("profile") : "Войти";
  setLoginButtonName(loginBtnName);

    if (loginBtnName==="Войти"){
      showAuth ? setShowAuth(false) : setShowAuth(true)
    }

    else {
      setShowAuth(false);    //remove from here to auth.js

      if (showUserMenu===false){
        let userId = localStorage.getItem(loginButtonName);

        var data = { "key" : userId };
        console.log(data);
        var url = new URL('http://172.17.0.1:8080/drawings');
        let params = {'user_id': userId, 'load': false};
        url.search = new URLSearchParams(params);

        fetch(url).then(function (response) {
                  response.json().then(function(data) {
                  setDrawings(data);
               })});
      }
      showUserMenu ? setShowUserMenu(false) : setShowUserMenu(true);
    }
  }

  const logout=()=>{
    setShowUserMenu(false);
    setLoginButtonName("Войти");
    let diagramElement = document.getElementById("diagram");
    let diagram: Object[] = diagramElement.ej2_instances[0];

    diagram.clear();

    sessionStorage.clear();

  if(projectName!="Новая карта"){
    setProjectName("Новая карта");
  }

  document.getElementsByClassName("projectName")[0].lastChild.data = "Новая карта";

  localStorage.clear();
  }

  const setFullScreen=()=>{
    setShowNavbar(false);
    setShowList(false);
  }

  const createNewProject = () => {
    setShowSaveMenu(true);
  }

  function  exportProject  (fileFormat) {
    let diagramElement = document.getElementById("diagram");
    let diagram: Object[] = diagramElement.ej2_instances[0];

    let exportOptions: IExportOptions = {};

    exportOptions.format = fileFormat;
    exportOptions.mode = "Download";
    exportOptions.region = "PageSettings";
  //exportOptions.multiplePage = checkBoxObj.checked;
    exportOptions.fileName = projectName;
    exportOptions.margin = { left: 0, top: 0, bottom: 0, right: 0 };
    diagram.exportDiagram(exportOptions);
  }

  const saveProject = () => {

    const userName = localStorage.getItem("profile");

    console.log(projectName);

      if (userName) {
        if (projectName==="Новая карта"){
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
        }
    }else{
    setShowAlert(true);
    setShowAuth(true);
    }
  }

  const loadProject = (e) => {
    sessionStorage.clear();

    var url = new URL('http://172.17.0.1:8080/session');
    let sessionParams = {'user_id': localStorage.getItem(loginButtonName), 'drawingName': e.target.value};
    url.search = new URLSearchParams(sessionParams);

    fetch(url).then(function (response) {
      response.json().then(function(data) {
      if (data.length!=0){
        let session = data[0]["session"];
        for (var key in session) sessionStorage.setItem(key, session[key]);
        }
        })});

    console.log(e.target.value);
    let drawingName = e.target.value;

    document.getElementsByClassName("projectName")[0].lastChild.data = drawingName;
    setProjectName(drawingName);

    let userId = localStorage.getItem(loginButtonName);
    var url = new URL('http://172.17.0.1:8080/drawings');
    let params = {'user_id': userId, 'name': drawingName, 'load': true};
    url.search = new URLSearchParams(params);

    fetch(url).then(function (response) {
                  response.json().then(function(data) {
                  console.log(data);
                  console.log(data[0]["drawing"]);

                  let diagramElement = document.getElementById("diagram");
                  let diagram: Object[] = diagramElement.ej2_instances[0];

                  diagram.loadDiagram(data[0]["drawing"]);

               })});

    let pjName = document.getElementById("project-name");
    console.log(pjName.defaultValue);
    console.log(drawingName);
    pjName.defaultValue = drawingName;
    console.log(pjName.value);
    setProjectName(drawingName);
  }

  const manageShape = (e) => {
    let diagramElement = document.getElementById("diagram");
    let diagram: Object[] = diagramElement.ej2_instances[0];

    const buttonOption = e.target.value;

    if (buttonOption==="cut"){
      diagram.cut();
    }else if (buttonOption==="copy"){
      diagram.copy();
    }else if (buttonOption==="paste"){
      diagram.paste();
    }else if (buttonOption==="undo"){
      console.log("undo");
      diagram.undo();
    }else if (buttonOption==="redo"){
      diagram.redo();
    }else {
      diagram.remove();
    }

    //console.log("selected shape");
    //console.log(diagram.selectedItems.nodes[0]);
    //console.log(e.target.value);
    }

  return (
     <div className="header">
     <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_container">
         <div className="file-menu-space">
          <p><a className="file-button" >Файл</a></p>
            <div className="file_menu" >
              <button onClick={createNewProject}>Создать</button>
              <button onClick={saveProject}>Сохранить</button>
              <button className="export-button">Экспортировать
                <div className="file-format">
                  <button  onClick={() => exportProject('PNG')}>PNG</button>
                  <button onClick={() => exportProject('JPG')}>JPG</button>
                </div>
                </button>
            </div>
            </div>
          <div className="edit-menu-space">
          <p>Редактировать</p>
          <div className="edit_menu" >
             <button value="undo" onClick={manageShape}>Отмена</button>
              <button value="redo" onClick={manageShape}>Повтор</button>
              <button value="cut" onClick={manageShape}>Вырезать</button>
              <button value="copy" onClick={manageShape}>Копировать</button>
              <button value="paste" onClick={manageShape}>Вставить</button>
              <button value="delete" onClick={manageShape}>Удалить</button>
            </div>
            </div>
            <div className="view-menu-space">
          <p>Вид</p>
            <div className="view_menu" >
             <button onClick={() => setGrid()}>Сетка</button>
              <button onClick={() => setFullScreen()}>На весь экран</button>
            </div>
            </div>
        </div>
      </div>
     <div className="gpt3__navbar-sign">
        <button type="button" onClick={handleLoginButton} >{localStorage.getItem("profile") ? localStorage.getItem("profile") : "Войти"}</button>
          { showAuth && <Auth setLoginButtonName={setLoginButtonName} loginButtonName={loginButtonName} setShowAuth={setShowAuth}/>}
          { showUserMenu &&
            <div className="user-dropdown-menu">
              <select id="project-info" onChange={loadProject}>
                <option onClick={logout}>выйти</option>
                {drawings.map((drawing) => <option  key={drawing.drawing} value={drawing.name}>{drawing.name}</option>)}
              </select>
            </div>
          }
      </div>


    </div>
    <div className="navbar-newcard" >
        <EditText id="project-name" className="projectName"  defaultValue={"Новая карта"} onSave={(value) => setProjectName(value.value)} />
    </div>
    </div>
  );
};

export default Navbar;

/*this.state = {
    showAuth: false,
  }

  function _showAuth (bool)  {
    this.setState({ showAuth: bool});
  }

  */