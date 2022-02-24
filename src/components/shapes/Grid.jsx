import React from 'react';
import { DiagramComponent, SymbolPaletteComponent, Node } from "@syncfusion/ej2-react-diagrams";
import './shapes.css';

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
    lineColor: "#e0e0e0",
    lineIntervals: interval
};
let diagramInstance;

const Grid = () => {
  return (
     <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"700px"} snapSettings={{
            horizontalGridlines: gridlines,
            verticalGridlines: gridlines
        }}  //Sets the default values of a node
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
                { style: { color: "white", fill: "transparent" } }
            ];
            //Set ports
            obj.ports = getPorts(node);
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
        //Sets the Node style for DragEnter element.
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
                obj.style = { fill: "#FBEC5D", strokeColor: "white" };
            }
        }}/>
        </div>
  );
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

export default Grid;