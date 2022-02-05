import * as React from "react";
import { DiagramComponent, SymbolPaletteComponent, Node } from "@syncfusion/ej2-react-diagrams";
import "./shapes.css";
/**
 * Diagram Default sample
 */
//Initializes the nodes for the diagram

//Initializes the connector for the diagram
let connectors = [
    {
        id: "connector1",
        sourceID: "NewIdea",
        targetID: "Meeting"
    },
    { id: "connector2", sourceID: "Meeting", targetID: "BoardDecision" },
    { id: "connector3", sourceID: "BoardDecision", targetID: "Project" },
    {
        id: "connector4",
        sourceID: "Project",
        annotations: [{ content: "Yes", style: { fill: "white" } }],
        targetID: "End"
    },
    {
        id: "connector5",
        sourceID: "End",
        annotations: [{ content: "Yes", style: { fill: "white" } }],
        targetID: "transaction_completed"
    },
    {
        id: "connector6",
        sourceID: "transaction_completed",
        targetID: "transaction_entered"
    },
    { id: "connector7", sourceID: "transaction_completed", targetID: "Data" },
    { id: "connector8", sourceID: "transaction_completed", targetID: "node10" },
    {
        id: "connector9",
        sourceID: "node11",
        targetID: "Meeting",
        segments: [{ direction: "Top", type: 'Orthogonal', length: 120 }]
    },
    {
        id: "connector10",
        sourceID: "End",
        annotations: [{ content: "No", style: { fill: "white" } }],
        targetID: "node11",
        segments: [{ direction: "Right", type: 'Orthogonal', length: 100 }]
    },
    {
        id: "connector11",
        sourceID: "Project",
        annotations: [{ content: "No", style: { fill: "white" } }],
        targetID: "node11"
    },
    {
        id: "connector12",
        style: { strokeDashArray: "2,2" },
        sourceID: "transaction_entered",
        targetID: "node12"
    }
];
//Initialize the flowshapes for the symbol palatte
let flowshapes = [
    { id: "Terminator", shape: { type: "Flow", shape: "Terminator" } },
    { id: "Process", shape: { type: "Flow", shape: "Process" } },
    { id: "Decision", shape: { type: "Flow", shape: "Decision" } },
    { id: "Document", shape: { type: "Flow", shape: "Document" } },
    {
        id: "PreDefinedProcess",
        shape: { type: "Flow", shape: "PreDefinedProcess" }
    },
    { id: "PaperTap", shape: { type: "Flow", shape: "PaperTap" } },
    { id: "DirectData", shape: { type: "Flow", shape: "DirectData" } },
    { id: "SequentialData", shape: { type: "Flow", shape: "SequentialData" } },
    { id: "Sort", shape: { type: "Flow", shape: "Sort" } },
    { id: "MultiDocument", shape: { type: "Flow", shape: "MultiDocument" } },
    { id: "Collate", shape: { type: "Flow", shape: "Collate" } },
    { id: "SummingJunction", shape: { type: "Flow", shape: "SummingJunction" } },
    { id: "Or", shape: { type: "Flow", shape: "Or" } },
    { id: "InternalStorage", shape: { type: "Flow", shape: "InternalStorage" } },
    { id: "Extract", shape: { type: "Flow", shape: "Extract" } },
    { id: "ManualOperation", shape: { type: "Flow", shape: "ManualOperation" } },
    { id: "Merge", shape: { type: "Flow", shape: "Merge" } },
    {
        id: "OffPageReference",
        shape: { type: "Flow", shape: "OffPageReference" }
    },
    {
        id: "SequentialAccessStorage",
        shape: { type: "Flow", shape: "SequentialAccessStorage" }
    },
    { id: "Annotation", shape: { type: "Flow", shape: "Annotation" } },
    { id: "Annotation2", shape: { type: "Flow", shape: "Annotation2" } },
    { id: "Data", shape: { type: "Flow", shape: "Data" } },
    { id: "Card", shape: { type: "Flow", shape: "Card" } },
    { id: "Delay", shape: { type: "Flow", shape: "Delay" } }
];
//Initializes connector symbols for the symbol palette
let connectorSymbols = [
    {
        id: "Link1",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
        id: "link3",
        type: "Orthogonal",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        targetDecorator: { shape: "None" },
    },
    {
        id: "Link21",
        type: "Straight",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: "Arrow", style: { strokeColor: '#757575', fill: '#757575' } },
        style: { strokeWidth: 1, strokeColor: '#757575' }
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
        id: "link33",
        type: "Bezier",
        sourcePoint: { x: 0, y: 0 },
        targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575' },
        targetDecorator: { shape: "None" }
    }
];
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
const Shapes = () => {
        return (<div className="control-pane">
        <div className="control-section">
          <div style={{ width: "100%" }}>
            <div className="sb-mobile-palette-bar">
              <div id="palette-icon" style={{ float: "right", role: "button" }} className="e-ddb-icons1 e-toggle-palette"></div>
            </div>
            <div id="palette-space" className="sb-mobile-palette">
              <SymbolPaletteComponent id="symbolpalette" expandMode="Multiple" palettes={[
            {
                id: "flow",
                expanded: true,
                symbols: flowshapes,
                iconCss: "e-diagram-icons1 e-diagram-flow",
                title: "Flow Shapes"
            },
            {
                id: "connectors",
                expanded: true,
                symbols: connectorSymbols,
                iconCss: "e-diagram-icons1 e-diagram-connector",
                title: "Connectors"
            }
        ]} width={"100%"} height={"700px"} symbolHeight={60} symbolWidth={60} getNodeDefaults={(symbol) => {
            if (symbol.id === "Terminator" ||
                symbol.id === "Process" ||
                symbol.id === "Delay") {
                symbol.width = 80;
                symbol.height = 40;
            }
            else if (symbol.id === "Decision" ||
                symbol.id === "Document" ||
                symbol.id === "PreDefinedProcess" ||
                symbol.id === "PaperTap" ||
                symbol.id === "DirectData" ||
                symbol.id === "MultiDocument" ||
                symbol.id === "Data") {
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
            <div id="diagram-space" className="sb-mobile-diagram">
              <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} height={"700px"} snapSettings={{
            horizontalGridlines: gridlines,
            verticalGridlines: gridlines
        }} nodes={nodes} connectors={connectors} //Sets the default values of a node
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
                obj.style = { fill: "#357BD2", strokeColor: "white" };
            }
        }}/>
            </div>
          </div>
        </div>
      </div>);
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