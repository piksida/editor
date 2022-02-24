import React, { useState, useCallback, useEffect } from 'react';
import { Navbar, Shapes, Editor, List, Auth, Grid, ColorPicker, SaveMenu, AlertAuth } from './components';
import { DiagramComponent, SymbolPaletteComponent, Node } from "@syncfusion/ej2-react-diagrams";

import './App.css';

const App = () => {

const [currentShape, setCurrentShape] = useState(null);
const [gridlinesColor, setGridlinesColor] = useState("white");
const [ toDoList, setToDoList ] = useState([]);
const [taskBoxName, setTaskBoxName] = useState("");
const [showNavbar, setShowNavbar] = useState(true);
const [showList, setShowList] = useState(true);
const [showAuth, setShowAuth] = useState(false);
const [showSaveMenu, setShowSaveMenu] = useState(false);
const [projectName, setProjectName] = useState("Новая карта");
const [showAlert, setShowAlert] = useState(false);
const [alertMessage, setAlertMessage] = useState("Пройдите авторизацию");

const escFunction = useCallback( (event) => {
  console.log(event.key);
    if (event.key ==="Escape") {
      console.log("pressed");
      setShowNavbar(true);
      setShowList(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      console.log("pressed");
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);



    return (
        <div className='App'>
          { showNavbar &&
          (<div className="gradient__bg">
            <Navbar id="navbar" setGridlinesColor={setGridlinesColor} gridlinesColor={gridlinesColor} taskBoxName={taskBoxName}
            setTaskBoxName={setTaskBoxName} setShowNavbar={setShowNavbar} setShowList={setShowList}
            showAuth={showAuth} setShowAuth={setShowAuth}
            projectName={projectName} setProjectName={setProjectName}
            setShowSaveMenu={setShowSaveMenu}
            setAlertMessage={setAlertMessage}
            setShowAlert={setShowAlert} />
          </div>)
          }

              <Shapes className='shapes' gridlinesColor={gridlinesColor} setTaskBoxName={setTaskBoxName} toDoList={toDoList} setToDoList={setToDoList}
              currentShape={currentShape} setCurrentShape={setCurrentShape} />
          { showList &&
              <div className="todolist" style={ { width: 75 } } >

                <List taskBoxName={taskBoxName} setTaskBoxName={setTaskBoxName} toDoList={toDoList} setToDoList={setToDoList} currentShape={currentShape}/>

              </div>
          }
          { showSaveMenu && <SaveMenu showAuth={showAuth} setShowAuth={setShowAuth} setShowSaveMenu={setShowSaveMenu}
          projectName={projectName} setProjectName={setProjectName} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage}/> }
          { showAlert && <AlertAuth setShowAlert={setShowAlert} alertMessage={alertMessage} setAlertMessage={setAlertMessage} />}

        < /div>
    );
}

export default App;