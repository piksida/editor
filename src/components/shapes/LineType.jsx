import React, { useState} from 'react';

import "./shapes.css";

const LineType =( {currentShape} ) => {
const changeLineType = (e) => {
    console.log(e.target.value);

    if (e.target.value!==""){
    if (e.target.value==="straight-line"){
    currentShape.style = { strokeDashArray: ''};
    }else{
      currentShape.style = { strokeDashArray: '2,2'};
    }
    }
    }

   {
    return(
     <div>
       <div className="select-line-type">
         <select id="line-type" onChange={changeLineType}>
           <option>выберите тип линии</option>
           <option value="straight-line"  >- сплошная</option>
           <option value="dashed-line">- - пунктирная</option>
         </select>
       </div>
     </div>
     )
  }
}

export default LineType;