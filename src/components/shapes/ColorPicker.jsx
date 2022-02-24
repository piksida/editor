import React, { useState} from 'react';
import { ChromePicker } from 'react-color';
import './shapes.css';

const ColorPicker =({currentShape}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBorderColorPicker, setShowBorderColorPicker] = useState(false);
  const [color, setColor] = useState("white");

  const applyColorNode = (e) => {
    const shapeId = {currentShape};

    if(e.target.value==="cancel-color"){
      currentShape.style = { fill: "white" };
    }else{
      currentShape.style = { fill: color["hex"]};
    }


    /*let diagramElement = document.getElementById(currentShape);
    let diagram: Object[] = diagramElement.ej2_instances;
    console.log(diagram);

    console.log(color["hex"]);

    console.log(diagramElement["style"]["fill"]);

    diagramElement["style"]["fill"] = color["hex"];
    //diagramElement.color = color["hex"];
    console.log(shapeId)
    if(elementType==="node"){
    currentShape.style = { fill: color["hex"]};
    }else{
    currentShape.style = { strokeColor: color["hex"]};
    }*/
  }

  const applyColorConnector = (e) => {
    const shapeId = {currentShape};

    if (e.target.value==="cancel-color-granitsi"){
      currentShape.style = { strokeColor: "#000000" };
    }else{
      currentShape.style = { strokeColor: color["hex"]};
      }
    }

    return(
     <div>
       <div className="primitives-buttons">
         <button id="zalivka" onClick={() => setShowColorPicker(showColorPicker => !showColorPicker)}>{showColorPicker ? 'Закрыть' : 'Заливка'}&nbsp;</button>
         <button value="apply-color" onClick={applyColorNode} >Применить&nbsp;</button>
         <button value="cancel-color" onClick={applyColorNode}>Отмена</button>
       </div>
       <div className="lines-buttons">
         <button id="granitsi" onClick={() => setShowBorderColorPicker(showBorderColorPicker => !showBorderColorPicker)}>{showBorderColorPicker ? 'Закрыть' : 'Границы'}&nbsp;</button>
         <button value="apply-color-granitsi" onClick={applyColorConnector}>Применить&nbsp;</button>
         <button value="cancel-color-granitsi" onClick={applyColorConnector}>Отмена</button>
       </div>
       {
         (showColorPicker || showBorderColorPicker) && <ChromePicker color={color} onChange={updatedColor => setColor(updatedColor)} />
       }

     </div>
     );

}

export default ColorPicker;

