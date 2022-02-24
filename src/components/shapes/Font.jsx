import React, { useState} from 'react';

import "./shapes.css";

const Font =( {currentShape} ) => {
  const [fontsize, setFontSize] = useState(1);

  const increaseFont = () => {

    currentShape.style = { strokeWidth: fontsize+1};
    setFontSize(fontsize+1);

    }

    const decreaseFont = () => {

    currentShape.style = { strokeWidth: fontsize>1 ? fontsize-1 : fontsize};
    setFontSize(fontsize>1 ? fontsize-1 : fontsize);

    }

   {
    return(
     <div>
       <div className="font-buttons">
         <button onClick={() => increaseFont()}>+</button>
         <h>&nbsp;&nbsp;{fontsize}pt&nbsp;&nbsp;</h>
         <button onClick={() => decreaseFont()}>-</button>
       </div>
     </div>
     )
  }
}

export default Font;