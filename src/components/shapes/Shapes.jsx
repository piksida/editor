import * as React from "react";
import { useState } from "react";
import { DiagramComponent, DiagramContextMenu, ContextMenuSettingsModel, SymbolPaletteComponent, Node, PrintAndExport, UndoRedo, Inject, DiagramBeforeMenuOpenEventArgs } from "@syncfusion/ej2-react-diagrams";
import {
     ContextMenuComponent
} from '@syncfusion/ej2-react-navigations';
import {
    MenuEventArgs
} from '@syncfusion/ej2-navigations';
import { ChromePicker } from 'react-color';
import "./shapes.css";

import  List  from '../todolist/List';
import ColorPicker from './ColorPicker';
import Font from './Font';
import LineType from './LineType';

/**
 * Diagram Default sample
 */
//Initializes the nodes for the diagram


//Initializes the connector for the diagram

//Initialize the flowshapes for the symbol palatte
let menuItems = [
            {
                text: 'Cut',
                iconCss: 'e-cm-icons e-cut'
            },
            {
                text: 'Copy',
                iconCss: 'e-cm-icons e-cm-copy'
            },
            {
                text: 'Paste',
                iconCss: 'e-cm-icons e-paste',
                items: [
                    {
                        text: 'Paste Text',
                        iconCss: 'e-cm-icons e-pastetext'
                    },
                    {
                        text: 'Paste Special',
                        iconCss: 'e-cm-icons e-pastespecial'
                    }
                ]
            },
            {
                separator: true
            },
            {
                text: 'Link',
                iconCss: 'e-cm-icons e-link'
            },
            {
                text: 'New Comment',
                iconCss: 'e-cm-icons e-comment'
            }
        ];

let flowshapes = [
    { id: 'Прямоугольник', shape: { type: 'Flow', shape: 'Process' } },
    { id: "Фигура", shape: { type: "Flow", shape: "Terminator" } },
    { id: 'Треугольник', shape: { type: 'Basic', shape: 'Triangle' } },
    { id: "Квадрат", shape: { type: "Flow", shape: "Process" } },
    { id: 'Овал', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: 'Трапеция', shape: { type: 'Basic', shape: 'Trapezoid' } },
    { id: 'Ромб', shape: { type: 'Basic', shape: 'Diamond' } },
    { id: 'Круг', shape: { type: 'Basic', shape: 'Ellipse' } },
    { id: "Параллелограмм", shape: { type: "Flow", shape: "Data" } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols = [
    {
        id: "link2",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575', strokeDashArray: '2,2' },
        targetDecorator: { shape: "None" }
    },
    {
        id: "link23",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        targetDecorator: { shape: "None" }
    },
    {
        id: "Link22",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeColor: '#757575', strokeDashArray: '2,2' }
    },
    {
        id: "Link21",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeColor: '#757575' }
    }
];

let clearHistory;
let startActionInstance;
let endGroupAction;
let redoListInstance;
let undoListInstance;
let undoInstance;
let redoInstance;
let diagramInstance;



const Shapes = ( {gridlinesColor,setTaskBoxName, toDoList, setToDoList, currentShape, setCurrentShape} ) => {

//const [currentShape, setCurrentShape] = useState(null);
//const [colorChange, setColorChange] =
let interval;
interval = [
    1,
    9,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75,
    0.25,
    9.75
];
let gridlines = {
    lineColor: gridlinesColor,
    lineIntervals: interval
};
let diagramInstance;
let clearHistory;
let startActionInstance;
let endGroupAction;
let redoListInstance;
let undoListInstance;
let undoInstance;
let redoInstance;

        return (<div className="control-pane">
        <div id="colorpicker">
          <ColorPicker currentShape={currentShape} />
        </div>

        <div className="fontsizeswitch" id="fontsizeswitch">
          <Font currentShape={currentShape} />
        </div>

        <div className="linetypeswitch" id="linetypeswitch">
          <LineType currentShape={currentShape} />
        </div>

        <div className="control-section">

          <div style={{ width: "100%" }}>

            <div id="palette-space" className="sb-mobile-palette">

              <SymbolPaletteComponent id="symbolpalette" expandMode="Multiple" palettes={[
            {
                id: "flow",
                expanded: true,
                symbols: flowshapes,
                iconCss: "e-diagram-icons1 e-diagram-flow",
                title: "Фигуры"
            },
            {
                id: "connectors",
                expanded: true,
                symbols: connectorSymbols,
                iconCss: "e-diagram-icons1 e-diagram-connector",
                title: "Линии и стрелки"
            },
            {
                id: "colorpicker",
                expanded: true,
                title: "Изменить цвет"
            },
            {
                id: "fontsizeswitch",
                expanded: true,
                title: "Изменить толщину линии"
            },
            {
                id: "linetypeswitch",
                expanded: true,
                title: "Изменить тип линии"
            }
        ]} width={"100%"} height={"700px"} symbolHeight={60} symbolWidth={60} getNodeDefaults={(symbol) => {
            if (symbol.id === "Фигура" ||
                symbol.id === "Прямоугольник" ||
                symbol.id === "Delay") {
                symbol.width = 80;
                symbol.height = 40;
            }
            else if (symbol.id === "Овал") {
              symbol.width = 120;
              symbol.height = 60;
            }
            else if (symbol.id === "Decision" ||
                symbol.id === "Document" ||
                symbol.id === "PreDefinedProcess" ||
                symbol.id === "PaperTap" ||
                symbol.id === "DirectData" ||
                symbol.id === "MultiDocument" ||
                symbol.id === "Параллелограмм") {
                symbol.width = 50;
                symbol.height = 40;
            }
            else {
                symbol.width = 50;
                symbol.height = 50;
            }
            symbol.style.strokeColor = '#757575';
        }} symbolMargin={{ left: 15, right: 15, top: 15, bottom: 15 }} getSymbolInfo={(symbol) => {
            return { fit: true };
        }}/>


            </div>
            <div id="diagram-space" className="sb-mobile-diagram" >
              <DiagramComponent className="diagram-component" id="diagram"  ref={diagram => (diagramInstance = diagram)}
            width={"100%"} height={"900px"} snapSettings={{
            horizontalGridlines: gridlines,
            verticalGridlines: gridlines,


        }} //Sets the default values of a node
         getNodeDefaults={(node) => {
            let obj = {};
            if (obj.width === undefined) {
                obj.width = 145;
            }
            else {
                let ratio = 100 / obj.width;
                obj.width = 100;
                obj.height *= ratio;
            }
            obj.style = { fill: "#357BD2", strokeColor: "white" };
            obj.annotations = [
                { style: { color: "black", fill: "transparent" } }
            ];
            //Set ports
            obj.ports = getPorts(node);
             if (obj.annotations.length>0){console.log(obj.annotations)}
                else {console.log("no")}
            return obj;
        }} //Sets the default values of a connector
         getConnectorDefaults={(obj) => {
            if (obj.id.indexOf("connector") !== -1) {
                obj.type = "Orthogonal";
                obj.targetDecorator = {
                    shape: "Arrow",
                    width: 10,
                    height: 10
                };
            }
        }}
              historyChange={(arg) => {
            getValue();
        }}
        //Sets the Node style for DragEnter element.
        click={(args) => {

          /* sendData let sendData = { user_id: "user", drawingName: "draw" };
          const items = {...sessionStorage};
          sendData["session"] = items;
          console.log(items);

          fetch('http://172.17.0.1:8080/session', {
              method: 'POST',
              mode: 'cors',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
               },
               body: JSON.stringify(sendData)
               }).then(function (response) {
                  response.json().then(function(data) {
                  console.log(data);
               })});*/



            let obj = args.element;

            if (obj.id!="diagram"){
              setCurrentShape(obj);
              setTaskBoxName(obj.annotations[0].content);

              if((sessionStorage[obj.annotations[0].content+"done"])){
              document.getElementsByName("task-checkbox")[0].checked=(JSON.parse(sessionStorage[obj.annotations[0].content+"done"])===true? true : false);
              }else{document.getElementsByName("task-checkbox")[0].checked= false;}
              //setButtonChecked(true);

              //document.getElementsByClassName("taskBoxName")[0] = obj.annotations[0].content;
              //document.getElementsByClassName("taskBoxName")[0].lastChild.data = obj.annotations[0].content;
              console.log("task");
              console.log(obj.annotations[0].content);
              document.getElementsByClassName("taskBoxName")[0].textContent = obj.annotations[0].content;
              console.log(document.getElementsByClassName("taskBoxName")[0].textContent);

              console.log(document.getElementsByClassName("taskBoxName")[0]);

              if(sessionStorage.getItem(obj.annotations[0].content)!==null){
            setToDoList(JSON.parse(sessionStorage.getItem(obj.annotations[0].content)));
            }else{
              setToDoList([]);

            }
            }else{
              console.log("diagram");
              //setButtonChecked(false);
              setCurrentShape("");
              setTaskBoxName("");
              document.getElementsByClassName("taskBoxName")[0].textContent = "";
              setToDoList([]);
              document.getElementsByName("task-checkbox")[0].checked=false;
              //document.getElementsByClassName("taskBoxName")[0].lastChild.data = obj.annotations[0].content;
            }

            //console.log("clicked");
            //console.log(obj);

            //setTaskBoxName(obj.annotations[0].content);
            //console.log(currentShape);
            }
        }

        dragEnter={(args) => {
            let obj = args.element;
            if (obj instanceof Node) {
                let oWidth = obj.width;
                let oHeight = obj.height;
                let ratio = 100 / obj.width;
                obj.width = 100;
                obj.height *= ratio;
                obj.offsetX += (obj.width - oWidth) / 2;
                obj.offsetY += (obj.height - oHeight) / 2;
                obj.style = { fill: "white", strokeColor: "black" };

            }
            }

}>


          <Inject services={[PrintAndExport, UndoRedo]}/>
        </DiagramComponent>
            </div>
          </div>
        </div>
      </div>);
    }

function getValue() {
    let undoStack = diagramInstance.historyManager.undoStack;
    let redoStack = diagramInstance.historyManager.redoStack;
    let undo = [];
    for (let i = 0; i < undoStack.length; i++) {
        undo.push({ 'text': undoStack[i].type, 'value': undoStack[i].type });
    }
    let redo = [];
    for (let i = 0; i < redoStack.length; i++) {
        redo.push({ 'text': redoStack[i].type, 'value': redoStack[i].type });
    }
    let itemsCount = diagramInstance.historyManager.stackLimit ? diagramInstance.historyManager.stackLimit : 0;
    undoListInstance.dataSource = undo;
    undoListInstance.fields = { text: 'text', value: 'text' };
    undoListInstance.index = 0;
    undoListInstance.dataBind();
    undoInstance.disabled = undo.length ? false : true;
    redoInstance.disabled = redo.length ? false : true;
    redoListInstance.dataSource = redo;
    redoListInstance.fields = { text: 'text', value: 'text' };
    redoListInstance.index = 0;
    redoListInstance.dataBind();
}
function getPorts(obj) {
    let ports = [
        { id: "port1", shape: "Circle", offset: { x: 0, y: 0.5 } },
        { id: "port2", shape: "Circle", offset: { x: 0.5, y: 1 } },
        { id: "port3", shape: "Circle", offset: { x: 1, y: 0.5 } },
        { id: "port4", shape: "Circle", offset: { x: 0.5, y: 0 } }
    ];
    return ports;
}
let isMobile;
function addEvents() {
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        let paletteIcon = document.getElementById('palette-icon');
        if (paletteIcon) {
            paletteIcon.addEventListener('click', openPalette, false);
        }
    }
}
function openPalette() {
    let paletteSpace = document.getElementById('palette-space');
    isMobile = window.matchMedia('(max-width:550px)').matches;
    if (isMobile) {
        if (!paletteSpace.classList.contains('sb-mobile-palette-open')) {
            paletteSpace.classList.add('sb-mobile-palette-open');
        }
        else {
            paletteSpace.classList.remove('sb-mobile-palette-open');
        }
    }
}

export default Shapes;
